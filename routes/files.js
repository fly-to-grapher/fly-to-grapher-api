var express = require('express');
var router = express.Router();
var {addFile , updateFile , deleteFile , getFile , getFiles , getFilesByCategory ,getFilesByTag , } = require('../controllers/filesController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var { isAdmin } = require('../middlewares/isAdmin')


router.post('/add'  , addFile)
router.get('/' , getFiles)
router.get('/:id' , getFile)
router.get('/bytag/:id' , getFilesByTag)
router.get('/bycategory/:id' , getFilesByCategory)
router.put('/:id' ,  updateFile)
router.delete('/:id' , deleteFile)


module.exports = router;
