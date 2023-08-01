const express = require('express')
const router = express.Router()

const userRouter = require('./users')
const authRouter = require('./authentication')
const dashboardRouter = require('./dashboard')
const refreshRouter = require('./token-refresh')

const authenticateUser = require('../middleware/authentication')
const refreshToken = require('../middleware/token-refresh')

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/dashboard', authenticateUser, dashboardRouter)
router.use('/refresh-token', refreshToken, refreshRouter)

module.exports = router
