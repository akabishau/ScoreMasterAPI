const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name must be at least 2 characters'],
        maxLength: [60, 'Name must be less than 60 characters'],
        trim: true,
        index: true
    },
    email: {
        // select: false,
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        // mongoose throws validation error if false
        // stopOnFirstError
        validate: [
            {
                validator: (value) => validator.isEmail(value),
                message: (props) => `${props.value} is not a valid email address`
            },
            {
                validator: (value) => value.length <= 100,
                message: 'Email must be less than 100 characters'
            }
        ],
        set: (value) => value.toLowerCase(),
        trim: true
    },
    password: {
        // select: false,
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters'],
        maxLength: [100, 'Password must be less than 100 characters']
    }
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (err) {
        next(err)
    }
})


userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (err) {
        throw err
    }
}


const User = mongoose.model('User', userSchema)

module.exports = User