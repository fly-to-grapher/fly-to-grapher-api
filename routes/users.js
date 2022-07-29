var express = require('express');
var router = express.Router();
var {signUp , logIn , getUsers , getUserFiles , getUserSave , profile , updateUser , deleteUser} = require('../controllers/usersController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var { isAdmin } = require('../middlewares/isAdmin')

router.post('/signup' , signUp)
router.post('/login' , logIn)
router.get('/' , getUsers)
router.get('/:id' , profile)
router.get('/files' , getUserFiles)
router.get('/save' , getUserSave)
router.put('/update/:id', updateUser)
router.delete('/:id' , deleteUser)



module.exports = router;
