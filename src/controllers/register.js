const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

module.exports = async (req, res, next) => {
    console.log('register')
    console.log(req.body)
    try {
        const user = await User.create(req.body)
        res.status(StatusCodes.CREATED).json({ user })
    } catch (err) {
        next(err)
    }
}