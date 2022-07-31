var bcryptjs = require('bcryptjs')
var jwt = require('jsonwebtoken')


var authService = {
    signUser: function (user) {
        const token = jwt.sign(
            {
                email: user.email,
                id: user.id,
                admin: user.isadmin,
            },
            `${process.env.JWT_SECRET_KEY}`,
            {
                expiresIn: '100h'
            }
        );
        return token;
    },
    verifyToken: async function (req, token) {
        if (!token) {
            return false
        }
        try {
            let decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
            const user = await models.Users.findByPk(decoded.id)
            if (user) {
                return user
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    },
    hashPassword: function(plainPassword) {
        var salt = bcryptjs.genSaltSync(10)
        var hashedPassword = bcryptjs.hashSync(plainPassword, salt)
        return hashedPassword
    },
    comparePasswords: function(plainPassword, hashedPassword) {
        return bcryptjs.compareSync(plainPassword, hashedPassword)
    }
}

module.exports = authService