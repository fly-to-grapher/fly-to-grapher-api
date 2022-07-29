var models = require('../models');
var { errorResponse, successResponse } = require('../helpers/response');
var {fileTransformer , filesTransformer} = require('../transformers/filesTransformers')
var {categoryTransformer} = require('../transformers/categoriesTransformers')
var {tagTransformer} = require('../transformers/tagsTransformers')
var {likesTransformer} = require('../transformers/likesTransformers')

const addFile = async (req, res) => {
    const title = req?.body?.title
    const image = req?.file?.image
    const description = req?.body?.description
    const country_id = req?.body?.country_id
    const category_id = req?.body?.category_id
    if (title == "") {
        return res.send(errorResponse("Please fill the post title"));
    }
    if (description == "") {
        return res.send(errorResponse("Please fill the description"));
    }
    const post = await models.Files.create({
        title,
        image: req.file?.filename,
        country_id,
        user_id: req.user.id,
        description,
        category_id
    })
    if (post) {
        res.send(successResponse(("Post created successfully", { data: postTransformer(post) })))
        return
    } else {
        return res.send(errorResponse('Error'))
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
