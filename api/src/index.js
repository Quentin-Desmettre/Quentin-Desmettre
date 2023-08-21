require('dotenv').config()
const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()
const { fetchData } = require('./utils/FetchData')

app.listen(PORT, () => {
    console.log("Server running on port 3000");
})

const sendError = (res, error, status=500) => {
    res.status(status).send({
        error: error
    })
}

const checkUsername = (username) => {
    // TODO: Find a way to handle multiple usernames, without surcharging the server with requests
    if (!username || username !== 'Quentin-Desmettre') {
        return false;
    }
    return true;
}

const checkDataType = (data_type) => {
    if (!data_type)
        return true;
    if (!['stats', 'repos'].includes(data_type)) {
        return false;
    }
    return true;
}

app.get('/user/:username/:data_type?', async (req, res) => {
    const { username, data_type } = req.params;

    // Error handling
    if (!checkUsername(username) || !checkDataType(data_type)) {
        sendError(res, "Invalid username or data type", 400);
        return;
    }

    // Fetch data
    const data = await fetchData(username, data_type);
    if (!data) {
        sendError(res, "Internal Server Error");
        return;
    }
    res.send(data);
})
