var express = require('express');
var router = express.Router();
var {addFile , updateFile , deleteFile , getFile , getFiles , getFilesByCategory ,getFilesByTag , } = require('../controllers/filesController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')


router.post('/add' , isAuthenticated , addFile)
router.get('/'  , getFiles)
router.get('/:id'  ,getFile)
router.get('/bytag/:id' , getFilesByTag)
router.get('/bycategory/:id' , getFilesByCategory)
router.put('/:id' , isAuthenticated , updateFile)
router.delete('/:id' , isAuthenticated , deleteFile)


module.exports = router;
