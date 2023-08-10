import { User } from '../models/User'
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log('register')
  try {
    const user = await User.create(req.body)
    res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
}
