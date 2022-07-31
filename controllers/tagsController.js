const models = require('../models')
const {errorResponse, successResponse} = require('../services/response')


const addTag = async (req, res, next) => {
    const name = req.body?.name
    if (name != '') {
        const [tag, created] = await models.Tags.findOrCreate({
            where: {
                name
            }
        })
        if (created) {
            res.send(successResponse(tag, 'Tag has been added'))
        } else {
            res.send(errorResponse('The tag is already there'))
        }
        return
    }
    res.send(errorResponse('Please check the tag information'))
}


const getTags = async (req, res, next) => {
    const tags = await models.Tags.findAll({})
    if (tags) {
        res.send(successResponse(tags))
    } else {
        res.send(errorResponse('An error occurred'))
    }
};


const getTag = async (req, res, next) => {
    const id = +req.params.id
    const tag = await models.Tags.findOne({
        where: {
            id
        }
    })
    if (tag) {
        res.send(successResponse(tag))
    } else {
        res.status(404)
        res.send(errorResponse('Tag not found'))
    }
};


const updateTag = async (req, res, next) => {
    const id = +req.params.id
    const name = req.body.name
    const category = await models.Tags.findByPk(id)
    if (category) {
        category.name = name
        category.save().then((category) => {
            res.send(successResponse(category, 'Tag has been updated'))
        })
    } else {
        res.status(404)
        res.send(errorResponse('Tag not found'))
    }
}


const deleteTag = async function (req, res, next) {
    const id = +req.params.id
    const deleted = await models.Tags.destroy({
        where: {
            id
        }
    });
    if (deleted) {
        res.send(successResponse(null, 'Tag has been deleted'))
    } 
    
    
    else {
        res.send(errorResponse('An error occurred while deleting Tag'))
    };
    return

};



module.exports = {
    addTag,
    getTags,
    getTag,
    deleteTag,
    updateTag
}