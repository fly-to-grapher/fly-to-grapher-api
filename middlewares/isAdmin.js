var models = require("../models")
const { errorResponse } = require('../helpers/response')


const isAdmin = async (req , res , next) =>{
    const user = await models.Users.findByPk(req.user.id)
    if (user?.isadmin == 1) {
        return next()
    };
    res.status(403)
    res.send(errorResponse('You are not admin'));
    return
}


module.exports = { isAdmin  }