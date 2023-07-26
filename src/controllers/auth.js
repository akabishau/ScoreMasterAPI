const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const generateTokens = require('../lib/jwt')

const register = async (req, res, next) => {
    console.log('register')
    console.log(req.body)
    try {
        const user = await User.create(req.body)
        res.status(StatusCodes.CREATED).json({ user })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    console.log('login')
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw {
                status: StatusCodes.BAD_REQUEST,
                message: 'Please provide email and password'
            }
        }

        const user = await User.findOne({ email })
        if (!user) {
            throw {
                status: StatusCodes.BAD_REQUEST,
                message: 'Invalid email'
            }
        }

        const isPasswordCorrect = await user.isValidPassword(password)
        if (!isPasswordCorrect) {
            throw {
                status: StatusCodes.BAD_REQUEST,
                message: 'Invalid password'
            }
        }

        const tokens = generateTokens(user)

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
        console.log(err)
        next(err)
    }
}


module.exports = { register, login }