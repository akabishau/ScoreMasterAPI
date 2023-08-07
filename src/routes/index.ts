import express from 'express'
const router = express.Router()

import userRouter from './users'
import authRouter from './authentication'
import dashboardRouter from './dashboard'
import refreshRouter from './token-refresh'

import authenticateUser from '../middleware/authentication'
import handleTokenRefresh from '../middleware/token-refresh'

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/dashboard', authenticateUser, dashboardRouter)
router.use('/refresh-token', handleTokenRefresh, refreshRouter)

export default router
