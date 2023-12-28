const express = require('express')
const router = express.Router()

const storageMulterHelper = require('../../helpers/storage.multer.helper.js')

// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')

const controller = require('../../controllers/admin/products.controllers.js')

router.get('/', controller.index)

router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)

router.delete('/delete/:id', controller.deleteItem)

router.get('/create', controller.create)
router.post('/create', upload.single('thumbnail'), uploadCloud.upload, controller.createPost)

router.get('/edit/:id', controller.edit)
router.patch('/edit/:id', upload.single('thumbnail'), uploadCloud.upload, controller.editPatch)

router.get('/detail/:id', controller.detail)

module.exports = router
