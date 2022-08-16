var express = require('express');
var router = express.Router();
var {addSave , getUserSaves} = require('../controllers/saveController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var {isOwner} = require('../middlewares/isOwner')

router.post('/:id' , isAuthenticated , addSave)
router.get('/' , isAuthenticated , isOwner('save') , getUserSaves)

module.exports = router;
