const fs = require('fs');
const path = require('path');
const { fetchGithubData } = require('./src/FetchGithubData');

const dataDirectory = path.join(__dirname, 'data');
const files = fs.readdirSync(dataDirectory);

// Go through every json file in the data folder.
// for every file.json, run the fetchGithubData function and replace the file.json with the new data.
files.forEach((filename) => {
    if (!filename.endsWith('.json'))
        return;
    const username = filename.replace('.json', '');
    fetchGithubData(username).then((data) => {
        fs.writeFileSync(path.join(dataDirectory, filename), JSON.stringify(data, null, 4));
    });
});
