const express = require('express')
const router = express.Router()

const userRouter = require('./users')
const authRouter = require('./auth/auth')
const dashboardRouter = require('./dashboard')
const refreshRouter = require('./auth/refresh')

const authenticateUser = require('../middleware/auth')
const refreshToken = require('../middleware/refresh')


router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/dashboard', authenticateUser, dashboardRouter)
router.use('/refresh-token', refreshToken, refreshRouter)

module.exports = router