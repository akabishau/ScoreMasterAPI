const passport = require('passport')

const authenticateUser = (req, res, next) => {
  console.log('authenticateUser')
  // console.log('Token extracted:', ExtractJwt.fromAuthHeaderAsBearerToken()(req))
  passport.authenticate(
    'access-jwt',
   { session: false }
   )(req, res, next)
}

module.exports = authenticateUser