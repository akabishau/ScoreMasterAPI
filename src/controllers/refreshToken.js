const { StatusCodes } = require('http-status-codes')
const generateTokens = require('../lib/jwt')


const refreshToken = async (req, res, next) => {
    try {
        console.log('refreshToken controller')
        const user = req.user
        const tokens = generateTokens(user)
        user.refreshToken = tokens.refreshToken
        await user.save()
        res.cookie('accessToken', tokens.accessToken, { httpOnly: true }) // sameSite: 'none', secure: true
        res.status(StatusCodes.OK).json({
            status: 'success',
            refreshToken: tokens.refreshToken,
            user: {
                id: user._id,
                name: user.name
            }
        })
    } catch (err) {
        console.log(err.message)
        next(err)
    }

}

module.exports = refreshToken