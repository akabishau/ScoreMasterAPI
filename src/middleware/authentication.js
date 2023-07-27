const passport = require('passport')

module.exports =  async (req, res, next) => {
  console.log('authenticateUser')
  try {
    passport.authenticate(
      'access-jwt',
      { session: false }
    )(req, res, next)
  } catch (err) {
    console.log('authenticateUser middleware', err.message)
    next(err)
  }
}