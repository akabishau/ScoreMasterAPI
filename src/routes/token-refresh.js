const express = require('express')
const router = express.Router()
const handleTokenRefresh = require('../controllers/token-refresh')

router.route('/').get(handleTokenRefresh)

module.exports = router
