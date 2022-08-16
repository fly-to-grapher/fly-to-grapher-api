var models = require('../models')
var {successResponse , errorResponse} = require('../helpers/response')
var {savesTransformer} = require('../transformers/saveTransformers')


const addSave = async (req,res) => {
    try{
        const user_id = req?.user?.id
        const file_id = req?.params?.id
        const file = await models.Save.findOne({
            where:{
                id: file_id
            }
        })
        if(!file){
            return res.send(errorResponse('file not found'))
        }
        if(!user_id){
            return res.send(errorResponse('user not found'))
        }
        if(!file_id) {
            return res.send(errorResponse('plase enter file id'))
        }
        
        const [result , created] = await models.Save.findOrCreate({
            where:{
                user_id,
                file_id
            } 
    })
    if(created) {
        return res.send(successResponse(null , "Success"))
    } else {
        if(result){
            const isDeleted = await result.destroy()
            console.log(isDeleted , "bbbbbbbbbbbbbbbbbbbbbbbbbbb")
            return res.send(successResponse('save deleted'))
        }
        else return res.send(errorResponse('An error occurred while adding the save'))
    }
    } catch(err) {
        console.error(err)
        return res.status(500).send(errorResponse(err))
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


module.exports = {
    addSave,
    getUserSaves
}