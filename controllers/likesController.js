var models = require('../models')
var {successResponse , errorResponse} = require('../helpers/response')
var {likesTransformer} = require('../transformers/likesTransformers')


const addLike = async (req,res) =>{
    const like = await models.Likes.create({
        user_id : req.user.id,
        file_id :req.body.file_id
    })
    if(like) {
        res.send(successResponse(like) , "Success")
    } else {
        res.send(errorResponse('An error occurred while adding the like'))
    }
}

const getLikes = async (req,res) => {
    const likes = await models.Likes.findAll({
        include : [
            {model:models.Users},
            {model:models.Files}
        ]
    })
    if(likes) {
        res.send(successResponse(likesTransformer(likes)))
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
        res.send(successResponse(null, 'Like has been deleted'))
    } else {
        res.send(errorResponse('An error occurred while deleting Like'))
    };
};

module.exports = {
    addLike,
    getLikes,
    deleteLike
}