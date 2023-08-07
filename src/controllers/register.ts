import { User } from '../models/User'
import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log('register')
  console.log(req.body)
  try {
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ user })
  } catch (err) {
    next(err)
  }
}
