const { checkUsername, checkDataType, sendError } = require('../utils/routeChecks')
const { fetchData } = require('../utils/FetchData')

const fetchUserData = async (req, res) => {
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
}

module.exports = {
    fetchUserData
}
