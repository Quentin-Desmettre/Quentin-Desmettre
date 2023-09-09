
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

module.exports = {
    checkUsername,
    checkDataType,
    sendError
}
