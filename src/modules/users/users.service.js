import User from "./users.model.js";
import bcrypt from "bcrypt"

export class UserService {

  static async create(data) {
    return await User.create(data);
  }

  static async login(data) {
    const user = await User.findOne({
      where: {
        status: 'active',
        accountNumber: data.accountNumber,
      },
    });

    if (user && bcrypt.compareSync(data.password, user.password)) {
      return user;
    }

    return null;
  }

  static async findOneAccount(accountNumber){
    return await User.findOne({
      where: {
        status: 'active',
        accountNumber: accountNumber 
      }
    })
  }

  static async updateAmount(account, newAmount){
    
    const user = await UserService.findOneAccount(account);
    
    if (!user) {
      throw new Error('User not found (⊙_☉)');
    }
  
    return await user.update({ amount: newAmount });
  }

}
