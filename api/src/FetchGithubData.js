const { Octokit } = require("@octokit/core");
const { execSync } = require('child_process');
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN || ''
})
const fs = require('fs');
const EXTENSIONS_JSON = JSON.parse(fs.readFileSync('./assets/language_extensions.json', 'utf8'));

const githubRequest = (route, params) => {
    return octokit.request(route, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        },
        ...params
    })
}

const getLanguageExtensions = (language) => {
    try {
        return EXTENSIONS_JSON[language].extensions;
    } catch (e) {
        console.log("Unknown language: " + language);
        // TODO: report unknown language
        return [];
    }
}

const cloneRepo = (url, name) => {
    try {
        execSync(`(rm -rf ${name} && git clone ${url} ${name}) 2> /dev/null > /dev/null`);
    } catch (e) {
        return false;
    }
    return true;
}

const countRepoLinesByLanguage = async (repoUrl, repoName, languages) => {

    const DEST = `/tmp/${repoName}`;
    if (!cloneRepo(repoUrl, DEST))
        return {};

    let lines_for_language = {};
    for (let language of languages) {
        let extensions_str = getLanguageExtensions(language).join("' -o -name '");
        let cmd = `find ${DEST} -name '${extensions_str}' | xargs -d '\\n' wc -l | tail -n 1 | awk '{print $1}'`
        let lines = execSync(cmd);
        lines_for_language[language] = parseInt(lines);
    }
    return lines_for_language;
}

const fetchAllPages = async (route, params) => {
    let page = 1;
    let results = [];

    while (true) {
        let response;
        try {
            response = await githubRequest(route, {
                ...params,
                per_page: 100,
                page: page
            });
        } catch (e) {
            break;
        }

        if (!response.data.length)
            break;

        results = results.concat(response.data);
        page++;
    }
    return results;
}

const mergeCounters = (obj1, obj2) => {
    for (const [key, value] of Object.entries(obj2)) {
        if (!obj1[key]) {
            obj1[key] = 0;
        }
        obj1[key] += value;
    }
    return obj1;
}

const getLineAndByteCount = (lines_for_language, bytes_for_language) => {
    let lines_and_bytes_for_languages = {};
    for (let language of Object.keys(lines_for_language)) {
        if (!bytes_for_language[language])
            bytes_for_language[language] = 0;
        lines_and_bytes_for_languages[language] = {
            lines: lines_for_language[language],
            bytes: bytes_for_language[language]
        }
    }
    // Sort it
    return Object.fromEntries(Object.entries(lines_and_bytes_for_languages).sort(([, a], [, b]) => b.lines - a.lines));
}

const fetchGithubData = async (username) => {
    let commits = 0;
    let pull_requests = 0;
    let projects = 0;
    let lines_for_language = {};
    let bytes_for_language = {};

    // First, get the user's repositories.
    // Then, for each repository, get the languages, commits, pull requests, and lines of code (+ lines of code for each language).
    // Finally, return the data.

    // Get the user's repositories.
    console.log("request url: " + `GET /users/${username}/repos`)
    const repositories = await fetchAllPages('GET /users/{username}/repos', {
        username: username
    });
    projects = repositories.length;

    // Use Promise.all to perform requests in parallel and wait for all to finish.
    await Promise.all(repositories.map(async (repository) => {
        // Parallelize the requests
        const [commitsResponse, issues, languagesResponse] = await Promise.all([
            // Commits
            fetchAllPages('GET /repos/{owner}/{repo}/commits', {
                owner: username,
                repo: repository.name,
                author: username,
            }),

            // Pull requests
            fetchAllPages('GET /repos/{owner}/{repo}/issues', {
                owner: username,
                repo: repository.name,
                state: 'all',
                creator: username
            }),

            // Languages
            githubRequest('GET /repos/{owner}/{repo}/languages', {
                owner: username,
                repo: repository.name
            }),
        ]);

        commits += commitsResponse.length;
        pull_requests += issues.filter(issue => issue.pull_request).length;

        // Lines
        let lines = await countRepoLinesByLanguage(repository.clone_url, repository.name, Object.keys(languagesResponse.data));
        lines_for_language = mergeCounters(lines_for_language, lines);
        bytes_for_language = mergeCounters(bytes_for_language, languagesResponse.data);
    }));

    return {
        commits: commits,
        pull_requests: pull_requests,
        projects: projects,
        languages: getLineAndByteCount(lines_for_language, bytes_for_language)
    }
}

module.exports = {
    fetchGithubData
}
