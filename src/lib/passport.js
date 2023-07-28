const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { Strategy: BearerStrategy } = require('passport-http-bearer')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = () => {

  // JWT Strategy - Access token
  const jwtAccessTokenOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.accessToken]), // Extract from cookies
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  }


  passport.use(
    'access-jwt',
    new JwtStrategy(
      jwtAccessTokenOptions,
      async (jwtPayload, done) => {
        // done - Node.js convention of using (error, result)
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
    ))


  // Refresh Token Strategy
  passport.use(
    'refresh-bearer',
    new BearerStrategy({ passReqToCallback: true }, async (req, token, done) => {
      try {
        // jwt throws an error if token is invalid or expired
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findOne({ refreshToken: token })
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (error) {
        return done(error, false)
      }
    }))

  return passport
}

