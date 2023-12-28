const express = require('express')
const router = express.Router()

const controllers = require('../../controllers/admin/dashboard.controllers.js')

router.get('/', controllers.index)

module.exports = router