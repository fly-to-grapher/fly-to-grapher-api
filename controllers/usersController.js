var models = require('../models');
var {successResponse , errorResponse} =require('../helpers/response');
var authService = require('../services/auth');
var {userTransformer , usersTransformer} = require('../transformers/usersTransformers')
var {filesTransformer , fileTransformer} = require('../transformers/filesTransformers')
const { Op } = require("sequelize");


const signUp = async (req, res) => {
    const username = req?.body?.username
    const email = req?.body?.email
    const password = req?.body?.password
    const name = req?.body?.name
    if (username?.length < 3) {
        return res.send(errorResponse('Username is too short'))
    }
    if (name?.length < 3) {
        return res.send(errorResponse('name is too short'))
    }
    if (password?.length < 6) {
        return res.send(errorResponse('Password is too short'))
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        return res.send(errorResponse('Email is invalid'))
    }
    const user = await models.Users.findOrCreate({
        where: {
            username,
                email
        },
        defaults: {
            name,
            password: authService.hashPassword(password),
        }
    })
    if (user) {
        return res.send(successResponse('User created successfully'))
    } else {
        return res.send(errorResponse('User is already registered'))
    }
}

const logIn = async (req, res, next) => {
    var userNameOrEmail = req.body.userNameOrEmail
    var password = req.body.password
    const user = await models.Users.findOne({
        where: {
            [Op.or]:
                [
                    { email: userNameOrEmail }, 
                    { username: userNameOrEmail }
                ]
        }
    })

    if (user) {
        if (authService.comparePasswords(password,user.password)) {
            return res.send(successResponse(userTransformer(user), null ,{
                token : authService.signUser(user)
            }))
        } else {
            return res.send(errorResponse('Password is wrong'))
        }
        } else {
        return res.send(errorResponse('Username or Email is wrong'))
    }
}


const userInfo = async (req,res) => {
    const bio = req?.body?.bio
    const location = req?.body.location
    if (location == "") {
        return res.send(errorResponse("Please fill the location"));
    }
    if (bio == "") {
        return res.send(errorResponse("Please fill the bio"));
    }
    const info = await models.Users.create({
        defaults: {
                bio,
                location
        }
    })
    if(info) {
        return res.send(successResponse('User created successfully'))
    } else {
        return res.send(errorResponse(''))
    }
}

const getUsers = async (req, res) => {
    const users = await models.Users.findAll({})
    if(users){
        return res.send(successResponse(usersTransformer(users) , "Success"))
    }
}

const profile = async (req, res) => {
    const id = +req.params.id
    const user = await models.Users.findOne({
        where: {
            id
        }})
    if (user) {
        return res.send(successResponse((user), "Success"))
    } else {
        return res.send(errorResponse('There was an error'))
    }
}

const deleteUser = async (req,res) => {
    const id = +req.params.id
    const user = await models.Users.findByPk(id)
    if(user) {
        if(user) {
            const deleted = await models.Users.destroy({
                where: {
                    id
                }
            })
            if (deleted) {
                return res.send(successResponse('User deleted'))
            } else {
                return res.send(errorResponse('error'))
            }
        }
    }
}

const getUserFiles = async (req , res , next) => {
    const files = await models.Files.findAll({
        where :{
            '$User.id$': req.user.id
        },
        include : [
            {model : models.Users},
            {model : models.Likes},
            {model : models.Save}
        ]
    })
    return res.send(successResponse(filesTransformer(files) , "Success"))
}

const getUserSave = async (req , res , next) => {
    const files = await models.Save.findAll({
        where :{
            '$User.id$': req.user.id
        },
        include : [
            {model : models.Users},
            {model : models.Files},
            {model : models.Likes}
        ]
    })
    return res.send(successResponse(filesTransformer(files) , "Success"))
}

const updateUser = async (req, res) => {
    const username = req?.body?.username
    const email = req?.body?.email
    const name = req?.body?.name
    const password = req?.body?.password
    if (name?.length < 2) {
        res.send(errorResponse('The first name is too short'))
        return 
    }
    if (username?.length < 3) {
        res.send(errorResponse('The username is too short'))
        return 
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        res.send(errorResponse('The email is invalid'))
        return 
    }
    if (password?.length > 0) {
        if (password?.length < 6) {
            res.send(errorResponse('New password is too short'))
            return
        }
    }
    const user = await models.Users.findByPk(req.user.id)
    if (user) {
        user.name = name
        user.username = username
        user.email = email
        if (password?.length > 0) {
            user.password = authService.hashPassword(password);
        };
        user.save().then((user) => {
            res.send(successResponse(userTransformer(user) , "User has been updated"));
            return
        })
    } else {
        res.status(404)
        res.send(errorResponse('The user is undefined'));
    };
};

// const uploadAvatar = async (req,res) => {

// }

module.exports = {
    signUp,
    logIn,
    userInfo,
    getUsers,
    profile,
    deleteUser,
    getUserFiles,
    getUserSave,
    updateUser,
    // uploadAvatar
}
