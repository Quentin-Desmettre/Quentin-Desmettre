const { fetchGithubStats } = require('./FetchGithubStats');
const { fetchGithubRepos } = require('./FetchGithubRepos');
const fs = require('fs');

const fetchGithubData = async (username) => {
    const [stats, repos] = await Promise.all([
        fetchGithubStats(username),
        fetchGithubRepos(username)
    ]);
    return {
        stats: stats,
        repos: repos
    }
}

const fetchData = async (username, type, forceFetch=false) => {
    const FILENAME = `./data/${username}.json`;

    // Check if data has already been fetched
    if (fs.existsSync(FILENAME) && !forceFetch) {
        console.log("Data already fetched")
        const parsed_data = JSON.parse(fs.readFileSync(FILENAME, 'utf8'));
        if (!type)
            return parsed_data;
        if (parsed_data[type])
            return parsed_data[type];
    }

    // Else, fetch the data
    try {
        console.log("Fetching data")
        const data = await fetchGithubData(username);
        fs.writeFileSync(FILENAME, JSON.stringify(data, null, 4));
        return type ? data[type] : data;
    } catch (error) {
        return null;
    }
}

module.exports = {
    fetchData
}
