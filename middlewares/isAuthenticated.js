const authService = require('../services/auth');

const isAuthenticated = async function (req, res, next) {
    const token = req.headers?.authorization?.split(' ')[1]
    var loggedUser = await authService.verifyToken(token);
    if (loggedUser) {
        req.user = loggedUser
        return next()
    }
    res.status(401)
    res.send({
        success: false,
        messages: [
            'Please login to access this endpoint'
        ]
    })
    return
}

module.exports = { isAuthenticated }
