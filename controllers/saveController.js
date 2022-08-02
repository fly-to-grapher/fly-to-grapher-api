var models = require('../models')
var {successResponse , errorResponse} = require('../helpers/response')
var {savesTransformer} = require('../transformers/saveTransformers')


const addSave = async (req,res) =>{
    const save = await models.Save.create({
        user_id : req.user.id,
        file_id :req.body.file_id
    })
    if(save) {
        return res.send(successResponse(save) , "Success")
    } else {
        return res.send(errorResponse('An error occurred while adding the save'))
    }
}

const getUserSaves = async (req,res) => {
    const saves = await models.Save.findAll({
        where:{
            user_id : req.user.id,
        },
        include : [
            {model:models.Users},
            {model:models.Files}
        ]
    },)
    if(saves) {
        return res.send(successResponse(savesTransformer(saves)))
    } else {
        return res.send(errorResponse('An error occurred'))
    }
}

const deleteSave = async function (req, res, next) {
    const id = +req.params.id
    const result = await models.Save.destroy({
        where: {
            id
        }
    });
    if (result) {
        return res.send(successResponse(null, 'File has been deleted'))
    } else {
        return res.send(errorResponse('An error occurred while deleting File'))
    };
};

module.exports = {
    addSave,
    getUserSaves,
    deleteSave
}