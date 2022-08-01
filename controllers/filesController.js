var models = require('../models');
var { errorResponse, successResponse } = require('../helpers/response');
var {fileTransformer , filesTransformer} = require('../transformers/filesTransformers')
var {categoryTransformer} = require('../transformers/categoriesTransformers')
var {tagTransformer} = require('../transformers/tagsTransformers')
var {likesTransformer} = require('../transformers/likesTransformers')
const fs = require("fs");


const addFile = async (req, res) => {
    const location = req?.body?.location
    const file_type = req?.body?.file_type
    const categories = req?.body?.categories;
    const tags = req?.body?.tags;
    const file_name = req?.file?.file_name
    const user_id = req?.user?.id
    if (location == "") {
        return res.send(errorResponse("Please fill the location"));
    }
    const file = await models.Files.create({
        file_name,
        user_id,
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
        res.send(successResponse((filesTransformer(file) , "File created successfully")))
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
            { model: models.users },
            { model : models.Likes ,
                include : [models.users]
            }
        ],
    })
    const likes = await models.Likes.findAll({
        where: {
            file_id: id
        }
    })
    if (file && likes) {
        return res.send(successResponse(fileTransformer(file) , null , {
            likes:likesTransformer(likes)
        }))
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
        return res.send(successResponse(filesTransformer(files) , 'Success'))
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
        res.send(successResponse(categoryTransformer(result) , 'Success'))
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
        res.send(successResponse(tagTransformer(result) , 'Success'))
    } else {
        res.send(errorResponse("Failed getting result"));
    }
}


const updateFile = async (req, res) => {
    const id = req.params.id;
    const location = req?.body?.location
    const file_type = req?.body?.file_type
    const categories = req.body.categories;
    const tags = req.body.tags;
    const file = await models.Post.findByPk(id);
    if (file) {
        if (location) {
            file.location = location;
        }
        if (file_type) {
            file.file_type = file_type;
        }
        if (Array.isArray(categories)) {
            file.setCategories(categories);
        }
        if (Array.isArray(tags)) {
            file.setTags(tags);
        }
        if (req.file) {
            fs.unlink("uploads/" + file.file_name, () => { });
            file.file_name = req.file?.filename;
        }
        file.save().then((file) => {
            res.send(successResponse(fileTransformer(file), "File has been updated"));
            return;
        });
    } else {
        res.status(404);
        res.send(errorResponse("The file is undefined"));
    }
};



const deleteFile = async function (req, res, next) {
    const id = +req.params.id;
    const deleted = await models.Files.destroy({
        where: {
            id,
        },
    });
    if (deleted) {
        res.send(successResponse(null, "File has been deleted"));
    } else {
        res.send(errorResponse("An error occurred while deleting File"));
    }
};

module.exports = {
    addFile,
    getFile,
    getFiles,
    getFilesByCategory,
    getFilesByTag,
    updateFile,
    deleteFile
}
