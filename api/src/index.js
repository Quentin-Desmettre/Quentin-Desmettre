require('dotenv').config()

const PORT = process.env.PORT
const express = require('express')
const { handleEmailSend } = require('./routes/handleEmailSend')
const { fetchUserData } = require('./routes/fetchUserData')

// Express APP configuration
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ALLOWED_ORIGINS);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// GET routes
app.get('/user/:username/:data_type?', fetchUserData)

// POST routes
app.post('/sendEmail', jsonParser, handleEmailSend)

// Starting https server
const httpsServer = require('./httpsServer').createHttpsServer(app);
httpsServer.listen(PORT, () => {
    console.log("HTTPS server running on port " + PORT);
})
