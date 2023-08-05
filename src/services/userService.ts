import { User, IUserDocument } from '../models/User'

class UserService {
  async getAllUsers(): Promise<IUserDocument[]> {
    return User.find({}).exec()
  }
}

export default new UserService()
