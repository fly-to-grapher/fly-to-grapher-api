var express = require('express');
var router = express.Router();
var {addCategory , getCategories , getCategory , updateCategory , deleteCategory} = require('../controllers/categoriesController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var { isAdmin } = require('../middlewares/isAdmin')
const multer = require('multer')
const upload = multer()

router.post('/add'  , isAuthenticated ,isAdmin , upload.single('picture'),  addCategory )
router.get('/' ,  getCategories )
router.get('/:id' ,  getCategory )
router.put('/:id' , isAuthenticated , isAdmin , updateCategory )
router.delete('/:id' ,isAuthenticated , isAdmin, deleteCategory )

module.exports = router;
