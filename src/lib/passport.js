const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/User')


module.exports = () => {

    passport.use(new Strategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET_KEY,
        },
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

