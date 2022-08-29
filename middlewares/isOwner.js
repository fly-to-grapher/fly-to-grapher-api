var models = require('../models');
var { errorResponse } = require('../helpers/response')

const isOwner = (type) => {
    return async (req, res, next) => {
        const user = await models.Users.findByPk(req?.user?.id)
        if (user?.isAdmin == 1) {
            return next()
        };
        switch (type) {
            case 'file':
                const file_id = req.params.id;
                const file = await models.Files.findOne({
                    where: {
                        id: file_id
                    }
                })
                if (file?.user_id == req.user.id) {
                    return next()
                } else {
                    res.status(403)
                    return res.send(errorResponse('You are not authorized'))
                }
            case 'like':
                const like_id = req.params.id
                const like = await models.Likes.findOne({
                    where: {
                        id: like_id
                    }
                })
                if (like?.user_id === req.user.id) {
                    return next()
                } else {
                    res.status(403)
                    return res.send(errorResponse('You are not authorized'))
                }
            case 'save':
                const save_id = req.params.id
                const save = await models.Save.findOne({
                    where: {
                        id: save_id
                    }
                })
                if (save?.user_id === req.user.id) {
                    return next()
                } else {
                    res.status(403)
                    return res.send(errorResponse('You are not authorized'))
                }
        };
    };   
}

module.exports = {
    isOwner
}