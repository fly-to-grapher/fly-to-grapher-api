var express = require('express');
var router = express.Router();
var {signUp , logIn , getUsers , getUserFiles , getUserSave , profile , updateUser , deleteUser} = require('../controllers/usersController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var { isAdmin } = require('../middlewares/isAdmin')



module.exports = router;
