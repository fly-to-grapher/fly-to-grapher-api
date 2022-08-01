const { errorResponse } = require("../services/response")

const isAdmin = (req, res, next) => {
    if (req.user.isadmin == 1) {
        return next()
    }
    res.status(403)
    res.send(errorResponse('You are not authorized'))
    return
};

module.exports = {isAdmin}