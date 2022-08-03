var express = require('express');
var router = express.Router();
var {addLike , getFileLikes , removeLike} = require('../controllers/likesController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var { isOwner } = require('../middlewares/isOwner')

router.post('/add' , isAuthenticated , addLike)
router.get('/' , isAuthenticated , getFileLikes)
router.delete('/remove' , isAuthenticated , isOwner('like') , removeLike)

module.exports = router;
