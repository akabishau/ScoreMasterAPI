const express = require('express')
const router = express.Router()
const refreshToken = require('../../controllers/refreshToken')

router.route('/').get(refreshToken)

module.exports = router