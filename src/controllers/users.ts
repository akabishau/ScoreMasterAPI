import { Request, Response, NextFunction } from 'express'
import userService from '../services/userService'

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('getAllUsers')
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

export { getAllUsers }
