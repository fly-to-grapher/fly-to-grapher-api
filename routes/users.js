var express = require('express');
var router = express.Router();
var {signUp , logIn , getUsers , getUserFiles , getUserSave , profile , updateUser , deleteUser} = require('../controllers/usersController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var { isAdmin } = require('../middlewares/isAdmin')

router.post('/signup' , signUp)
router.post('/login' , logIn)
router.get('/' , isAuthenticated, isAdmin, getUsers)
router.get('/:id' , isAuthenticated ,profile)
router.get('/files' , isAuthenticated , getUserFiles)
router.get('/save' , isAuthenticated, getUserSave)
router.put('/update/:id', isAuthenticated ,updateUser)
router.delete('/:id' , isAuthenticated , isAdmin, deleteUser)



module.exports = router;
