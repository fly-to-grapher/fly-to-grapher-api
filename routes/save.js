var express = require('express');
var router = express.Router();
var {addSave , getUserSaves , deleteSave} = require('../controllers/saveController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')

router.post('/' , isAuthenticated , addSave)
router.get('/' , isAuthenticated , getUserSaves)
router.delete('/' , isAuthenticated , deleteSave)

module.exports = router;
