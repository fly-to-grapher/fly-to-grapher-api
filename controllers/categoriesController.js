const models = require('../models')
const {errorResponse, successResponse} = require('../helpers/response')
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebase = require("../fierbase")
const { getStorage } = require("firebase/storage");
const storage = getStorage(firebase)

const addCategory = async (req, res, next) => {
    const name = req?.body?.name
    const picture = req?.file
    // if (name != '') {
    //     return res.send(errorResponse('Please fill the name of the category !'))
    // }
    if (!picture) {
        return res.send(errorResponse('The picture has not have to be empty !'))
    }
    const picTypes = ['PNG','JPG', 'JPEJ', 'GIF', 'TIFF' , 'PSD' , 'PDF' , 'EPS' , 'AI' , 'INDD' , 'RAW']
    const uniqueFileName = `categories/${
        picture?.originalname?.split(".")[0]
        }%%${new Date().valueOf()}.${picture?.originalname?.split(".")[1]}`;
        const picRef = ref(storage, uniqueFileName);
        const metaType = { contentType: picture?.mimetype, name: picture?.originalname };
        if(!picTypes.includes(picture?.originalname?.split(".")[1]))
        return res.send(errorResponse(`please upload picture with those types: ${picTypes} `));
        await uploadBytes(picRef, picture?.buffer, metaType).then(async () => {
        const publicUrl = await getDownloadURL(picRef);
        const created = await models.Categories.findOrCreate({
            where: {
                name
            } ,
            defaults:{
                picture : publicUrl
            }
        })
        if (created) {
                return res.send(successResponse(created, 'Category has been added'))
        } else {
                return res.send(errorResponse('The category is already there'))
        }
     })
}


const getCategories = async (req, res, next) => {
    const categories = await models.Categories.findAll({})
    if (categories) {
        return res.send(successResponse(categories) , "Success")
    } else {
        return res.send(errorResponse('An error occurred'))
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
        return res.send(successResponse(category) , "Success")
    } else {
        res.status(404)
        res.send(errorResponse('Category not found'))
        return
    }
};


const updateCategory = async (req, res, next) => {
    const id = +req.params.id
    const name = req.body.name
    const category = await models.Categories.findByPk(id)
    if (category) {
        category.name = name
        category.save().then((category) => {
            return res.send(successResponse(category, 'Category has been updated'))
        })
    } else {
        res.status(404)
        res.send(errorResponse('Categoy not found'))
        return
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
        return res.send(successResponse(null, 'Category has been deleted'))
    } 
    else {
        return res.send(errorResponse('An error occurred while deleting Category'))
    };

};



module.exports = {
    addCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory
}