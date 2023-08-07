import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log('authenticateUser')
  try {
    passport.authenticate('access-jwt', { session: false })(req, res, next)
  } catch (err: Error | any) {
    console.log('authenticateUser middleware', err.message)
    next(err)
  }
}
