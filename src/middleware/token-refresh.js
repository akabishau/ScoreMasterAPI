const passport = require('passport')
const { StatusCodes } = require('http-status-codes')

module.exports = async (req, res, next) => {
  console.log('refreshToken Middleware')
  try {
    await passport.authenticate(
      'refresh-jwt',
      { session: false },
      // callback wheather or not authentication succeeds
      // can include additional info in the callback (custom message, etc.)
      (err, user) => {
        console.log('refreshToken callback')
        if (err) {
          // if token is expired/invalid, pass error to error-handler middleware
          err.status = StatusCodes.UNAUTHORIZED
          return next(err)
        }

        if (!user) {
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: 'Invalid refresh token' })
        }

        req.user = user
        next()
      }
    )(req, res, next)
  } catch (err) {
    console.log('refresh token middleware', err.message)
    next(err)
  }
}
