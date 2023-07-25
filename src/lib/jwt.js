const jwt = require('jsonwebtoken')

module.exports = (user) => {
    const payload = {
        userId: user._id,
        name: user.name
    }

    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)
    return token
}