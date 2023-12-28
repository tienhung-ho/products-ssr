
const express = require('express')
const router = express.Router()

const controllerProduct = require('../../controllers/client/product.controllers')

router.get('/edit', controllerProduct.edit)

router.get('/add', controllerProduct.add)

router.get('/', controllerProduct.index)

router.get('/detail/:slug', controllerProduct.detail)


module.exports = router
