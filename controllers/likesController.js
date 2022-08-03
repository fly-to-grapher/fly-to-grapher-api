var models = require('../models')
var {successResponse , errorResponse} = require('../helpers/response')
var {likesTransformer} = require('../transformers/likesTransformers')


const addLike = async (req,res) =>{
    const result = await models.Likes.create({
        user_id : req.user.id,
        file_id : req.body.file_id
    })
    if(result) {
        return res.send(successResponse(null , "Success"))
    } else {
        return res.send(errorResponse('An error occurred while adding the like'))
    }
}

const getFileLikes = async (req,res) => {
    const result = await models.Likes.findAll({
        file_id : req.body.file_id,
        include : [
            {model:models.Users},
            {model:models.Files}
        ]
    })
    if(result) {
        return res.send(successResponse(likesTransformer(result), "Success"))
    } else {
        return res.send(errorResponse('An error occurred'))
    }
}

const removeLike = async function (req, res, next) {
    const id = +req.params.id
    const result = await models.Likes.destroy({
        where: {
            id
        }
    });
    if (result) {
        return res.send(successResponse(null, 'Success'))
    } else {
        return res.send(errorResponse('An error occurred while removing Like'))
    };
};

module.exports = {
    addLike,
    getFileLikes,
    removeLike
}