import express from 'express'
const router = express.Router()

import userRouter from './users'
import authRouter from './authentication'
const dashboardRouter = require('./dashboard')
const refreshRouter = require('./token-refresh')

const authenticateUser = require('../middleware/authentication')
const refreshToken = require('../middleware/token-refresh')

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/dashboard', authenticateUser, dashboardRouter)
router.use('/refresh-token', refreshToken, refreshRouter)

export default router
