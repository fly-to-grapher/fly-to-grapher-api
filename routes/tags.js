var express = require('express');
var router = express.Router();
var {addTag , getTag , getTags , deleteTag , updateTag} = require('../controllers/tagsController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var { isAdmin } = require('../middlewares/isAdmin')

router.post('/add'  , isAuthenticated, isAdmin , addTag )
router.get('/' ,  getTags )
router.get('/:id' ,  getTag )
router.put('/:id' , isAuthenticated , isAdmin , updateTag )
router.delete('/:id' , isAuthenticated , isAdmin , deleteTag )

module.exports = router;
