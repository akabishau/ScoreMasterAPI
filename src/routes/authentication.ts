import express from 'express'
const router = express.Router()

import handleLogin from '../controllers/login'
import handleRegister from '../controllers/register'

router.route('/login').post(handleLogin)
router.route('/register').post(handleRegister)

export default router
