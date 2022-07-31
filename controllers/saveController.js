var models = require('../models')
var {successResponse , errorResponse} = require('../helpers/response')
var {savesTransformer} = require('../transformers/saveTransformers')


const addSave = async (req,res) =>{
    const save = await models.Save.create({
        user_id : req.user.id,
        file_id :req.body.file_id
    })
    if(save) {
        res.send(successResponse(save) , "Success")
    } else {
        res.send(errorResponse('An error occurred while adding the save'))
    }
}

const getSaves = async (req,res) => {
    const saves = await models.Save.findAll({
        include : [
            {model:models.Users},
            {model:models.Files}
        ]
    })
    if(saves) {
        res.send(successResponse(savesTransformer(saves)))
    }
}

const deletSave = async function (req, res, next) {
    const id = +req.params.id
    const deleted = await models.Save.destroy({
        where: {
            id
        }
    });
    if (deleted) {
        res.send(successResponse(null, 'File has been deleted'))
    } else {
        res.send(errorResponse('An error occurred while deleting File'))
    };
};

module.exports = {
    addSave,
    getSaves,
    deletSave
}