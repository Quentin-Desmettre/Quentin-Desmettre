const express = require('express')
const app = express()
const { fetchGithubData } = require('./FetchGithubData');
const fs = require('fs');
require('dotenv').config()
const PORT = process.env.PORT || 3000

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

    // TODO: Find a way to handle multiple usernames, without surcharging the server with requests
    if (username !== 'Quentin-Desmettre') {
        res.status(400).send({
            error: "Invalid username"
        })
    }

    // Check if there is a username.json file. If there is, send it
    const FILENAME = `./data/${username}.json`;
    if (fs.existsSync(FILENAME)) {
        console.log(`Found ${FILENAME}`);
        res.send(JSON.parse(fs.readFileSync(FILENAME, 'utf8')));
        return;
    }
    // Else, fetch the data
    try {
        const data = await fetchGithubData(username);
        fs.writeFileSync(FILENAME, JSON.stringify(data, null, 4));
        res.send(data);
    } catch (error) {
        sendError(res, "Internal Server Error");
    }
})
