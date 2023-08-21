const { githubRequest, fetchAllPages } = require("../octokit")

const getTagsAndLinks = async (username, repository) => {
    try {
        const metadata = await githubRequest('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: username,
            repo: repository.name,
            path: '.github/metadata.json'
        });

        const metadata_content = Buffer.from(metadata.data.content, metadata.data.encoding).toString();
        const metadata_json = JSON.parse(metadata_content);

        return [
            metadata_json.tags || [],
            metadata_json.links || []
        ]
    } catch (e) {
        return [[], []];
    }
}

const fetchGithubRepos = async (username) => {
    console.log("Fetching repositories for " + username + "...")
    const repositories = await fetchAllPages('GET /users/{username}/repos', {
        username: username
    });
    console.log("REPOS === Fetched " + repositories.length + " repositories for " + username);

    let repos = {};

    // template
    /*
    "repoN": {
		desc:
		url:
		created_at:
		last_updated:
		tags: [
			"Javascript", "C++", "CI/CD"
		]
		links: [
			{
				"type": "youtube"
				"link": "..."
			},
			{
				"type": "figma"
				"link": "..."
			},
            ...
		]
	}
    */
    // tags are searched in repo/.github/metadata.json, in the "tags" field
    // links are searched in repo/.github/metadata.json, in the "links" field
    await Promise.all(repositories.map(async (repository) => {

        console.log("REPO === " + repository.name)
        const [tags, links] = await getTagsAndLinks(username, repository);
        console.log("REPO === " + repository.name + " === " + tags + " === " + links + " ===")

        repos[repository.name] = {
            desc: repository.description || "",
            url: repository.html_url,
            created_at: repository.created_at,
            last_updated: repository.updated_at,
            tags: tags,
            links: links
        }
    }));
    console.log("Finished fetching repos for " + username + ".")

    return repos;
}

module.exports = {
    fetchGithubRepos
}
