import validator from 'validator'
import bcrypt from 'bcryptjs'

import { Document, Schema, Model, model } from 'mongoose'

interface IUser {
  name: string
  email: string
  password: string
  refreshToken: string
}

interface IUserDocument extends IUser, Document {
  // instance methods
  isValidPassword(password: string): Promise<boolean>
}

interface IUserModel extends Model<IUserDocument> {
  // static methods
}

const userSchema = new Schema<IUserDocument, IUserModel>(
  {
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
          validator: (value: string) => validator.isEmail(value),
          message: props => `${props.value} is not a valid email address`
        },
        {
          validator: (value: string) => value.length <= 100,
          message: 'Email must be less than 100 characters'
        }
      ],
      set: (value: string) => value.toLowerCase(),
      trim: true
    },
    password: {
      // select: false,
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters'],
      maxLength: [100, 'Password must be less than 100 characters']
    },
    refreshToken: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
)

// userSchema static methods
// userSchema instance methods

userSchema.pre('save', async function (next) {
  console.log('userSchema.pre(save)')
  // hash password before saving
  if (this.isModified('password')) {
    console.log('modified password')
    try {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
      console.log(error)
      return next(error as Error)
    }
  }
  console.log('other presave actions completed')
  next()
})

userSchema.methods.isValidPassword = async function (
  password: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (err) {
    throw err
  }
}

const User: IUserModel = model<IUserDocument, IUserModel>('User', userSchema)

export { User, IUser, IUserDocument }
