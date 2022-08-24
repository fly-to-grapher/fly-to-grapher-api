var models = require('../models');
var { errorResponse, successResponse } = require('../helpers/response');
var { fileTransformer, filesTransformer } = require('../transformers/filesTransformers')
var { categoryTransformer } = require('../transformers/categoriesTransformers')
var { tagTransformer } = require('../transformers/tagsTransformers')
var { likesTransformer } = require('../transformers/likesTransformers')
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebase = require("../fierbase")
const { getStorage } = require("firebase/storage");
const storage = getStorage(firebase)


const addFile = async (req, res) => {
    const location = req?.body?.location
    let file_type = req?.body?.file_type
    const categories = req?.body?.categories;
    const tags = req?.body?.tags;
    const file_name = req?.file
    const user_id = req?.user?.id
    console.log("tags: ", tags)
    if (!location) {
        return res.send(errorResponse("Please fill the location !"));
    }
    // if (location) {
    //     return res.send(errorResponse("Please fill the location !"));
    // }
    if (!categories) {
        return res.send(errorResponse("categories has not been empty !"));
    }
    const pictureTypes = ['PNG', 'JPG', 'JPEJ', 'GIF', 'TIFF', 'PSD', 'PDF', 'EPS', 'AI', 'INDD', 'RAW'];
    const videoTypes = ['mp4', 'MOV', 'WMV', 'AVI', 'AVCHD', 'FLV', 'F4V', 'SWF', 'MKV', 'WEBM', 'MPEG-2'];
    if (!file_name) {
        return res.send(errorResponse("file has not been empty !"));
    }
    const uniqueFileName = `files/${file_name?.originalname?.split(".")[0]
        }%%${new Date().valueOf()}.${file_name?.originalname?.split(".")[1]}`;
    const fileRef = ref(storage, uniqueFileName);
    const metaType = { contentType: file_name?.mimetype, name: file_name?.originalname };

    if (!pictureTypes.includes(file_name?.originalname?.split(".")[1]) && !videoTypes.includes(file_name?.originalname?.split(".")[1]))
        return res.send(errorResponse(`please upload file with those types: ${[...pictureTypes, ...videoTypes]} `));
    if (pictureTypes.includes(file_name?.originalname?.split(".")[1])) {
        file_type = "picture";
    } else if (videoTypes.includes(file_name?.originalname?.split(".")[1])) {
        file_type = "video"
    }
    await uploadBytes(fileRef, file_name?.buffer, metaType).then(async () => {
        const publicUrl = await getDownloadURL(fileRef);
        const file = await models.Files.create({
            file_name: publicUrl,
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
            res.send(successResponse(fileTransformer(file), "File created successfully"))
            return
        } else {
            return res.send(errorResponse('An error occurred while adding the file'))
        }
    })
}


const getFile = async (req, res) => {
    const id = req.params.id
    const file = await models.Files.findOne({
        where: {
            id
        },
        include: [
            { model: models.Users },
            { model: models.Save },
            {
                model: models.Likes,
                include: [models.users]
            }
        ],
    })
    const likes = await models.Likes.findAll({
        where: {
            file_id: id
        }
    })
    if (file && likes) {
        return res.send(successResponse(fileTransformer(file), null, {
            likes: likesTransformer(likes)
        }))
    } else {
        return res.send(errorResponse('There was an error'))
    }
}


const getAllPictures = async (req, res) => {
    const result = await models.Files.findAll({
        where: {
            file_type: "picture",
            // include:[
            //     {model:models.Likes},
            //     {model:models.save},
            // ]
        },
        // include:[
        //     {model:models.Likes},
        //     {model:models.save},
        // ]
        }
    )
    if (result) {
        return res.send(successResponse(filesTransformer(result), 'Success'))
    } else {
        return res.send(errorResponse('Failed to get pictures'))
    }
}


const getAllVideos = async (req, res) => {
    const result = await models.Files.findAll({
        where: {
            file_type: "video",
            // include:[
            //     {model:models.Likes},
            //     {model:models.save},
            // ]
        }

        // include:[
        //     {model:models.Likes},
        //     {model:models.save},
        // ]
    })
    if (result) {
        return res.send(successResponse(filesTransformer(result), 'Success'))
    } else {
        return res.send(errorResponse('Failed to get videos'))
    }
};

const getFiles = async (req, res) => {
    const files = await models.Files.findAll({
        include: [
            models.Users
        ]
    })
    if (files) {
        return res.send(successResponse(filesTransformer(files), 'Success'))
    } else {
        return res.send(errorResponse('There was an error'))
    }
}

<<<<<<< HEAD
const getFilesByCategory = async (req , res) => {
    const {id} = req?.params
    const result = await models.Categories.findByPk(id , {
        include:[
=======
const getFilesByCategory = async (req, res) => {
    const { id } = req.params
    const result = await models.Categories.findByPk(id, {
        include: [
>>>>>>> 118991f43960f4be35434f789e4e910a3156447a
            {
                model: models.Files
            }
        ]
    })
<<<<<<< HEAD
    if(result) {
        res.send(successResponse(filesTransformer(result) , 'Success'))
=======
    if (result) {
        res.send(successResponse(categoryTransformer(result), 'Success'))
>>>>>>> 118991f43960f4be35434f789e4e910a3156447a
    } else {
        res.send(errorResponse("Failed getting result"));
    }
}
const getFilesByTag = async (req, res) => {
    const { id } = req.params
    const result = await models.Tags.findByPk(id, {
        include: [
            {
                model: models.Files
            }
        ]
    })
    if (result) {
        res.send(successResponse(tagTransformer(result), 'Success'))
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
    deleteFile,
    getAllPictures,
    getAllVideos
}
