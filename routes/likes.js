var express = require('express');
var router = express.Router();
var {addLike , getLikes , deleteLike} = require('../controllers/likesController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')

router.post('/' , isAuthenticated , addLike)
router.get('/' , isAuthenticated , getLikes)
router.delete('/' , isAuthenticated , deleteLike)

module.exports = router;
