const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { fetchData } = require('./src/utils/FetchData');

const dataDirectory = path.join(__dirname, 'data');
const files = fs.readdirSync(dataDirectory);

// Go through every json file in the data folder.
// for every file.json, run the fetchGithubData function and replace the file.json with the new data.
Promise.all(files.map(async (filename) => {
    if (!filename.endsWith('.json'))
        return;
    const username = filename.replace('.json', '');
    await fetchData(username, null, true);
})).then(() => {
    console.log("Done");
});
