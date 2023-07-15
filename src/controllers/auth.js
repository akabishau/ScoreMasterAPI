const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
    console.log('register')
    console.log(req.body)
    try {
        const user = await User.create(req.body)
        res.status(StatusCodes.CREATED).json({ user })
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err })
    }
}

const login = async (req, res) => {
    console.log('login')
    try {
        const { email, password } = req.body
        if (!email || !password) {
            // upadate to throw error
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide email and password' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Invalid email' })
        }

        console.log(typeof password)
        const isPasswordCorrect = await user.isValidPassword(password)
        if (!isPasswordCorrect) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Invalid password' })
        }


        res.status(StatusCodes.OK).json({ user })


    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            {
                status: 'Login Failed',
                msg: err.message
            }
        )
    }
}


module.exports = { register, login }