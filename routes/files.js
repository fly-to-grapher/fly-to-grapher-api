var express = require('express');
var router = express.Router();
var {addFile , updateFile , deleteFile , getFile , getFiles , getFilesByCategory ,getFilesByTag, getAllPictures, getAllVideo , } = require('../controllers/filesController')
var { isAuthenticated } = require('../middlewares/isAuthenticated')
var {isOwner} = require('../middlewares/isOwner')
const multer = require('multer')
const upload = multer()

router.post('/add' , isAuthenticated , upload.single('file_name')  ,addFile)
router.get('/' , getFiles)
router.get('/pictures' , getAllPictures)
router.get('/videos' , getAllVideo)
router.get('/:id'  ,getFile)
router.get('/bytag/:id' , getFilesByTag)
router.get('/bycategory/:id' , getFilesByCategory)
router.put('/:id' , isAuthenticated , isOwner('file') , updateFile)
router.delete('/:id' , isAuthenticated , isOwner('file') , deleteFile)


module.exports = router;
