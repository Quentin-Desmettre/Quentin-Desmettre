const emailjs = require("@emailjs/nodejs").default
const serviceId = process.env["EMAILJS_SERVICE_ID"]
const templateId = process.env["EMAILJS_TEMPLATE_ID"]
const publicKey = process.env["EMAILJS_PUBLIC_KEY"]
const privateKey = process.env["EMAILJS_PRIVATE_KEY"]

const sendEmail = async (object, firstname, lastname, email, message) => {

    try {
        const response = await emailjs.send(serviceId, templateId, {
            object: object,
            firstname: firstname,
            lastname: lastname,
            email: email,
            message: message,
        }, {
            publicKey: publicKey,
            privateKey: privateKey
        })
        return response.status === 200
    } catch (e) {
        return false
    }

}

module.exports = {
    sendEmail
}
