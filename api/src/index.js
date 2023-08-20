const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
const { fetchGithubData } = require('./FetchGithubData');
const fs = require('fs');

app.listen(PORT, () => {
    console.log("Server running on port 3000");
})

const sendError = (res, error) => {
    res.status(500).send({
        error: error
    })
}

app.get('/', async (req, res) => {
    const username = req.query.username

    console.log(`Fetching data for ${username}`);
    // Error handling
    if (!username) {
        res.status(400).send({
            error: "Missing username"
        })
    }

    // Check if there is a username.json file. If there is, send it
    const FILENAME = `./data/${username}.json`;
    if (fs.existsSync(FILENAME)) {
        console.log(`Found ${FILENAME}`);
        res.send(JSON.parse(fs.readFileSync(FILENAME, 'utf8')));
        return;
    }
    // Else, fetch the data and add a cron job to fetch the data every 30 minutes
    try {
        console.log(`Fetching github for ${username}`);
        const data = await fetchGithubData(username);
        console.log(`Writing to ${FILENAME}`);
        fs.writeFileSync(FILENAME, JSON.stringify(data, null, 4));
        res.send(data);

        setTimeout(async () => {
            const newData = await fetchGithubData(username);
            fs.unlinkSync(FILENAME);
            fs.writeFileSync(FILENAME, JSON.stringify(newData, null, 4));
        }, 1000 * 60 * 30);
    } catch (error) {
        console.log(error);
        sendError(res, "Internal Server Error");
    }
})
