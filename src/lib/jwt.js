const jwt = require('jsonwebtoken')

module.exports = (user) => {
    
    const payload = {
        userId: user._id,
        name: user.name
    }

    const accessTokenOptions = { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    const refreshTokenOptions = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, accessTokenOptions)
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, refreshTokenOptions)

    return { accessToken, refreshToken }
}