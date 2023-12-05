import User from "./users.model.js";

export class UserService {

  static async create(data) {
    return await User.create(data);
  }

  static async login(data) {
    return await User.findOne({
      where: {
        accountNumber: data.accountNumber,
        password: data.password,
        status: 'active',
      },
    });
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
