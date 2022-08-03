var models = require('../models')
var {successResponse , errorResponse} = require('../helpers/response')
var {savesTransformer} = require('../transformers/saveTransformers')


const addSave = async (req,res) =>{
    const result = await models.Save.create({
        user_id : req.user.id,
        file_id : req.body.file_id
    })
    if(result) {
        return res.send(successResponse(null , "Success"))
    } else {
        return res.send(errorResponse('An error occurred while adding the save'))
    }
}

const getUserSaves = async (req,res) => {
    const result = await models.Save.findAll({
        user_id : req.body.user_id,
        include : [
            {model:models.Users},
            {model:models.Files}
        ]
    })
    if(result) {
        return res.send(successResponse(savesTransformer(result), "Success"))
    } else {
        return res.send(errorResponse('An error occurred'))
    }
}

const removeSave = async function (req, res, next) {
    const id = +req.params.id
    const result = await models.Save.destroy({
        where: {
            id
        }
    });
    if (result) {
        return res.send(successResponse(null, 'Success'))
    } else {
        return res.send(errorResponse('An error occurred while removing save'))
    };
};

module.exports = {
    addSave,
    getUserSaves,
    removeSave
}