var express = require('express');
var router = express.Router();
var {addLike , getFileLikes , getUserLikes} = require('../controllers/likesController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var { isAdmin } = require('../middlewares/isAdmin')

router.post('/:id' , isAuthenticated , addLike)
router.get('/file/:id' , isAuthenticated, isAdmin , getFileLikes)
router.get('/user/:id' , isAuthenticated, isAdmin , getUserLikes)
router.get('/' , isAuthenticated, getUserLikes)
module.exports = router;
