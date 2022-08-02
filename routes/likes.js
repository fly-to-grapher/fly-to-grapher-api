var express = require('express');
var router = express.Router();
var {addLike , getFileLikes , deleteLike} = require('../controllers/likesController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')

router.post('/' , isAuthenticated , addLike)
router.get('/' , isAuthenticated , getFileLikes)
router.delete('/' , isAuthenticated , deleteLike)

module.exports = router;
