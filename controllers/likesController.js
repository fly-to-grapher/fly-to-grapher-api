var models = require('../models')
var {successResponse , errorResponse} = require('../helpers/response')
var {likesTransformer} = require('../transformers/likesTransformers')


const addLike = async (req,res) =>{
    const like = await models.Likes.create({
        user_id : req.user.id,
        file_id : req.body.file_id
    })
    if(like) {
        return res.send(successResponse(null , "Success"))
    } else {
        return res.send(errorResponse('An error occurred while adding the like'))
    }
}

const getFileLikes = async (req,res) => {
    const likes = await models.Likes.findAll({
        file_id : req.body.file_id,
        include : [
            {model:models.Users},
            {model:models.Files}
        ]
    })
    if(likes) {
        return res.send(successResponse(likesTransformer(likes), "Success"))
    } else {
        return res.send(errorResponse('An error occurred'))
    }
}

const deleteLike = async function (req, res, next) {
    const id = +req.params.id
    const deleted = await models.Likes.destroy({
        where: {
            id
        }
    });
    if (deleted) {
        return res.send(successResponse(null, 'Like has been deleted'))
    } else {
        return res.send(errorResponse('An error occurred while deleting Like'))
    };
};

module.exports = {
    addLike,
    getFileLikes,
    deleteLike
}