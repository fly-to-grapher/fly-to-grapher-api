var express = require('express');
var router = express.Router();
var {addSave , getSaves , deletSave} = require('../controllers/saveController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')

router.post('/' , isAuthenticated , addSave)
router.get('/' , isAuthenticated , getSaves)
router.delete('/' , isAuthenticated , deletSave)

module.exports = router;
