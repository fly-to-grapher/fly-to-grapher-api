var express = require('express');
var router = express.Router();
var {signUp , logIn , getUsers , getUserFiles , getUserSave , myProfile , updateUser , updatePassword , deleteUser , updateAvatar , profileUser} = require('../controllers/usersController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var { isAdmin } = require('../middlewares/isAdmin')
const multer = require('multer')
const upload = multer()

router.post('/signup' , signUp)
router.post('/login' , logIn)
router.get('/' , isAuthenticated, isAdmin, getUsers)
router.get('/myprofile' , isAuthenticated , myProfile)
router.get('/profile/:id' , profileUser)
router.get('/files' , isAuthenticated , getUserFiles)
router.get('/save' , isAuthenticated, getUserSave)
router.put('/update', isAuthenticated ,updateUser)
router.delete('/:id' , isAuthenticated , isAdmin, deleteUser)
// router.put('/info' , isAuthenticated , updateInfo)
router.put('/avatar' , isAuthenticated , upload.single('avatar') , updateAvatar)
router.put('/password' , isAuthenticated , updatePassword)



module.exports = router;
