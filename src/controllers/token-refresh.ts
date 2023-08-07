import { StatusCodes } from 'http-status-codes'
import generateTokens from '../lib/jwt'
import { Request, Response, NextFunction } from 'express'
import { IUserDocument } from '../models/User'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('refreshToken controller')
    const user = req.user as IUserDocument
    const tokens = generateTokens(user)
    user.refreshToken = tokens.refreshToken
    await user.save()

    res.cookie('accessToken', tokens.accessToken, { httpOnly: true }) // sameSite: 'none', secure: true
    res.status(StatusCodes.OK).json({
      refreshToken: user.refreshToken,
      user: {
        id: user._id,
        name: user.name
      }
    })
  } catch (err) {
    console.log('refresh token controller error')
    next(err)
  }
}
