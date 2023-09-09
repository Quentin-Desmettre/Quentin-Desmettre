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
    const repositories = await fetchAllPages('GET /users/{username}/repos', {
        username: username
    });

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

        const [tags, links] = await getTagsAndLinks(username, repository);

        repos[repository.name] = {
            desc: repository.description || "",
            url: repository.html_url,
            created_at: repository.created_at,
            last_updated: repository.updated_at,
            tags: tags,
            links: links
        }
    }));

    return repos;
}

module.exports = {
    fetchGithubRepos
}
