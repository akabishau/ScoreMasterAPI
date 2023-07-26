const passport = require('passport')
// const { Strategy, ExtractJwt } = require('passport-jwt')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/User')
// const jwt = require('./jwt')


module.exports = () => {

  // JWT Strategy
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors(
      [
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req.cookies.accessToken, // Extract from cookies
      ]
    ),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  }


  passport.use(new JwtStrategy(
    jwtOptions,
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

  return passport
}

