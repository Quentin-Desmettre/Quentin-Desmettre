const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

const defaultEmailSentData = {
    success: false,
    infos: ""
}

const defaultMessage = {
    firstname: "",
    lastname: "",
    email: "",
    object: "",
    message: ""
}

const
    maxMessageLength = 500,
    maxFieldLength = 100;

export {
    validEmail,
    defaultEmailSentData,
    defaultMessage,
    maxMessageLength,
    maxFieldLength
}
