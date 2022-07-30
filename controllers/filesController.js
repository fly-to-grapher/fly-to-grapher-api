var models = require('../models');
var { errorResponse, successResponse } = require('../helpers/response');
var {fileTransformer , filesTransformer} = require('../transformers/filesTransformers')
var {categoryTransformer} = require('../transformers/categoriesTransformers')
var {tagTransformer} = require('../transformers/tagsTransformers')
var {likesTransformer} = require('../transformers/likesTransformers')

const addFile = async (req, res) => {
    const location = req?.body?.location
    const file_type = req?.body?.file_type
    const categories = req.body.categories;
    const tags = req.body.tags;
    if (location == "") {
        return res.send(errorResponse("Please fill the location"));
    }
    const file = await models.Files.create({
        file_name: req.file?.filename,
        user_id: req.user.id,
        location,
        file_type
    })
    if (file) {
        if (Array.isArray(categories)) {
            file.setCategories(categories);
        }
        if (Array.isArray(tags)) {
            file.setTags(tags);
        }
        res.send(successResponse(("File created successfully", { data: filesTransformer(file) })))
        return
    } else {
        return res.send(errorResponse('An error occurred while adding the file'))
    }
}


const getFile = async (req, res) => {
    const id = req.params.id
    const file = await models.Files.findOne({
        where: {
            id
        },
        include: [
            { model: models.users }
        ],
    })
    const likes = await models.Likes.findAll({
        where: {
            file_id: id
        }
    })
    if (file && likes) {
        return res.send(successResponse("Success", { data: fileTransformer(file), likes: likesTransformer(likes) }))
    } else {
        return res.send(errorResponse('There was an error'))
    }
}


const getFiles = async (req , res) => {
    const files = await models.Files.findAll({
        include:[
                models.Users
        ]
    })
    if (files) {
        return res.send(successResponse('Success' , {data : filesTransformer(files)}))
    } else {
        return res.send(errorResponse('There was an error'))
    }
}

const getFilesByCategory = async (req , res) => {
    const {id} = req.params
    const result = await models.Categories.findByPk(id , {
        include:[
            {
                model : models.Files
        }
    ]
    })
    if(result) {
        res.send(successResponse('Success' , categoryTransformer(result)))
    } else {
        res.send(errorResponse("Failed getting result"));
    }
}
const getFilesByTag = async (req , res) => {
    const {id} = req.params
    const result = await models.Tags.findByPk(id , {
        include:[
            {
                model : models.Files
        }
    ]
    })
    if(result) {
        res.send(successResponse('Success' , tagTransformer(result)))
    } else {
        res.send(errorResponse("Failed getting result"));
    }
}

module.exports = {
    addFile,
    getFile,
    getFiles,
    getFilesByCategory,
    getFilesByTag,
    updateFile,
    deleteFile
}
