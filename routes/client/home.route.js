const express = require('express')
const router = express.Router()

const controllersHome = require('../../controllers/client/home.controllers')

router.get('/', controllersHome.index)


module.exports = router