import express from 'express'
const router = express.Router()
import { IUser } from '../models/User'

router.route('/').get((req, res) => {
  const user = req.user as IUser

  if (user) {
    console.log('dashboard')
    res.send(`Hi, ${user.name}! Welcome to ScoreMaster Dashboard`)
  } else {
    res.status(401).send('Unauthorized')
  }
})

export default router
