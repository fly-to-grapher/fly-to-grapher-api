var authService = require('../services/auth')

const isAuthenticated = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1]
        const isVerified = authService.verifyToken(req, token)
        if (isVerified) {
            console.log("Verified");
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