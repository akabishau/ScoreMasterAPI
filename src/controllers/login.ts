// const User = require('../models/User')
import { User } from '../models/User'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import generateTokens from '../lib/jwt'

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log('login')
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: 'Please provide email and password'
      }
    }

    let user = await User.findOne({ email })
    if (!user) {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: 'Invalid email'
      }
    }

    const isPasswordCorrect = await user.isValidPassword(password)
    if (!isPasswordCorrect) {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: 'Invalid password'
      }
    }

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
    console.log('login controller', err)
    next(err)
  }
}
