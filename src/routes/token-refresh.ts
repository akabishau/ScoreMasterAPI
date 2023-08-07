import express from 'express'
const router = express.Router()
import handleTokenRefresh from '../controllers/token-refresh'

router.route('/').get(handleTokenRefresh)

export default router
