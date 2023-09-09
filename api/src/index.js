require('dotenv').config()

const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express')
const app = express()
const { checkUsername, checkDataType, sendError } = require('./utils/routeChecks')
const { fetchData } = require('./utils/FetchData')
const { sendEmail } = require('./utils/sendEmail')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // TODO: Change this to the actual domain
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})

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

app.post('/sendEmail', jsonParser, async (req, res) => {
    // Fetch data
    const {
        token,
        object,
        firstname,
        lastname,
        email,
        message
    } = req.body;

    if (!token || !object || !firstname || !lastname || !email || !message) {
        res.send({
            success: false,
            error: "Missing fields"
        });
        return;
    }

    // Verify token
    // TODO: Change this to the actual secret key
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${"6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"}&response=${token}`, {
        method: "POST",
    })
    const data = await response.json();

    if (!data.success) {
        res.send({
            success: false,
            error: "Invalid captcha"
        });
        return;
    }

    // Send email
    if ((await sendEmail(object, firstname, lastname, email, message)) !== true)
        res.send({
            success: false,
            error: "Internal Server Error"
        });
    else
        res.send({
            success: true
        });
})
