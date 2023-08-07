import jwt from 'jsonwebtoken'
import { tokenConfig } from '../config'
import { IUserDocument } from '../models/User'

interface Tokens {
  accessToken: string
  refreshToken: string
}

export default function (user: IUserDocument): Tokens {
  const payload = {
    userId: user._id,
    name: user.name
  }

  const accessTokenOptions = { expiresIn: tokenConfig.accessToken.expiresIn }
  const refreshTokenOptions = {
    expiresIn: tokenConfig.refreshToken.expiresIn
  }

  const accessToken = jwt.sign(
    payload,
    tokenConfig.accessToken.secret,
    accessTokenOptions
  )

  const refreshToken = jwt.sign(
    payload,
    tokenConfig.refreshToken.secret,
    refreshTokenOptions
  )

  return { accessToken, refreshToken }
}
