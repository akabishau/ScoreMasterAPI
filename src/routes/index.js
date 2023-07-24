const express = require('express')
const router = express.Router()

const userRouter = require('./users')
const authRouter = require('./auth')
const dashboardRouter = require('./dashboard')

const authenticateUser = require('../middleware/auth')


router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/dashboard', authenticateUser, dashboardRouter)

module.exports = router