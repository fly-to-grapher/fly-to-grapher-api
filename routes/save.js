var express = require('express');
var router = express.Router();
var {addSave , getUserSaves , removeSave} = require('../controllers/saveController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var {isOwner} = require('../middlewares/isOwner')

router.post('/add' , isAuthenticated , addSave)
router.get('/' , isAuthenticated , isOwner('save') , getUserSaves)
router.delete('/remove' , isAuthenticated , isOwner('save') , removeSave)

module.exports = router;
