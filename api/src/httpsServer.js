const fs = require('fs');
const https = require('https');

const createHttpsServer = (app) => {
    const credentials = {
        key: fs.readFileSync(process.env.SSL_PRIVATE_KEY_FILE, 'utf-8'),
        cert: fs.readFileSync(process.env.SSL_CERTIFICATE_FILE, 'utf-8'),
    }

    return https.createServer(credentials, app);
}

module.exports = {
    createHttpsServer
}
