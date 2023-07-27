const passport = require('passport')
const { StatusCodes } = require('http-status-codes')

const refreshToken = (req, res, next) => {
    console.log('refreshToken Middleware')
    passport.authenticate(
        'refresh-bearer',
        { session: false },
        // callback wheather or not authentication succeeds
        (err, user, info) => {
            if (err) {
                return next(err)
            }

            if (!user) {
                return res.status(StatusCodes.UNATHORIZED).json({ message: 'Invalid refresh token' })
            }

            req.user = user
            next()
        }
    )(req, res, next)
}

module.exports = refreshToken