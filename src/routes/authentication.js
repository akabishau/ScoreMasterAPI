const express = require('express')
const router = express.Router()

const handleLogin = require('../controllers/login')
const handleRegister = require('../controllers/register')

router.route('/register').post(handleRegister)
router.route('/login').post(handleLogin)

module.exports = router
