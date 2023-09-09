const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN || ''
})

const githubRequest = (route, params) => {
    return octokit.request(route, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        },
        ...params
    })
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


module.exports = {
    githubRequest,
    fetchAllPages
}
