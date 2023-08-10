import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate(
      'access-jwt',
      { session: false },
      (err: Error, user: Express.User, info: any) => {
        // err is handled by catch block
        if (!user) {
          const error = AppError.unauthorized('Unauthorized Access', {
            error: info.name,
            details: info.message
          })
          return next(error)
        }

        req.user = user
        next()
      }
    )(req, res, next)
  } catch (err) {
    const error = AppError.internal('Error authenticating user', err)
    next(error)
  }
}
