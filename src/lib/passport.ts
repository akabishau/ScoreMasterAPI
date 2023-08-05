import passport from 'passport'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

import { User } from '../models/User'

export default function () {
  // JWT Strategy - Access token
  const jwtAccessTokenOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([req => req.cookies.accessToken]), // Extract from cookies
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
  }

  const jwtCookieStrategy = new Strategy(
    jwtAccessTokenOptions,
    async (jwtPayload, done) => {
      // done - Node.js convention of using (error, result)
      console.log('jwtCookieStrategy')
      try {
        const user = await User.findById(jwtPayload.userId)
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (error) {
        return done(error, false) // error passed to error-handler middleware
      }
    }
  )

  // JWT Strategy - Refresh token
  const jwtRefreshTokenOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract from Authorization header
    secretOrKey: process.env.REFRESH_TOKEN_SECRET
  }

  const jwtBearerStrategy = new Strategy(
    jwtRefreshTokenOptions,
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.userId)
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (error) {
        return done(error, false) // error passed to error-handler middleware
      }
    }
  )

  passport.use('access-jwt', jwtCookieStrategy)
  passport.use('refresh-jwt', jwtBearerStrategy)
  return passport
}
