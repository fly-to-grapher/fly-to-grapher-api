const models = require('../models')
const {errorResponse, successResponse} = require('../helpers/response')


const addCategory = async (req, res, next) => {
    const name = req.body?.name
    if (name != '') {
        const [category, created] = await models.Categories.findOrCreate({
            where: {
                name
            }
        })
        if (created) {
            res.send(successResponse(category, 'Category has been added'))
        } else {
            res.send(errorResponse('The category is already there'))
        }
        return
    }
    res.send(errorResponse('Please check the category information'))
}


const getCategories = async (req, res, next) => {
    const categories = await models.Categories.findAll({})
    if (categories) {
        res.send(successResponse(categories))
    } else {
        res.send(errorResponse('An error occurred'))
    }
};


const getCategory = async (req, res, next) => {
    const id = +req.params.id
    const category = await models.Categories.findOne({
        where: {
            id
        }
    })
    if (category) {
        res.send(successResponse(category))
    } else {
        res.status(404)
        res.send(errorResponse('Category not found'))
    }
};


const updateCategory = async (req, res, next) => {
    const id = +req.params.id
    const name = req.body.name
    const category = await models.Categories.findByPk(id)
    if (category) {
        category.name = name
        category.save().then((category) => {
            res.send(successResponse(category, 'Category has been updated'))
        })
    } else {
        res.status(404)
        res.send(errorResponse('Categoy not found'))
    }
}


const deleteCategory = async function (req, res, next) {
    const id = +req.params.id
    const deleted = await models.Categories.destroy({
        where: {
            id
        }
    });
    if (deleted) {
        res.send(successResponse(null, 'Category has been deleted'))
    } 
    
    
    else {
        res.send(errorResponse('An error occurred while deleting Category'))
    };
    return

};



module.exports = {
    addCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory
}