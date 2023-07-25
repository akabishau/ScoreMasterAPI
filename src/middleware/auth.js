const passport = require('passport')

const authenticateUser = (req, res, next) => {
  console.log('authenticateUser')
  // console.log('Token extracted:', ExtractJwt.fromAuthHeaderAsBearerToken()(req))
  passport.authenticate(
    'jwt',
   { session: false }
   )(req, res, next)
}

module.exports = authenticateUser