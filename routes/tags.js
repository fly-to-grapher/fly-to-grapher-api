var express = require('express');
var router = express.Router();
var {} = require('../controllers/tagsController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var { isAdmin } = require('../middlewares/isAdmin')



module.exports = router;
