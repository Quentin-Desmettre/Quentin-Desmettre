const { sendEmail } = require('../utils/sendEmail')

const GOOGLE_RECAPTCHA_SECRET_KEY = process.env["GOOGLE_RECAPTCHA_SECRET_KEY"]

const handleEmailSend = async (req, res) => {
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
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`, {
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
    if ((await sendEmail(object, firstname, lastname, email, message)) !== true) {
        res.send({
            success: false,
            error: "Internal Server Error"
        });
        return;
    }
    res.send({
        success: true
    });
}

module.exports = {
    handleEmailSend
}
