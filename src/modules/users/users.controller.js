import { TransferService } from "../transfers/transfers.service.js";
import { UserService } from "./users.service.js";


export const signup = async (req, res) => {
  try {
    const { name, password } = req.body;

    const accountNumber = Math.floor(100000 + Math.random() * 900000);

    const user = await UserService.create({ name, password, accountNumber });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error in the database.',
        error: error.message
      });
    }

    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error during signup.',
      error: error.message
    });
  }
};
  
  export const login = async (req, res) => {
    try {
      const { accountNumber, password } = req.body;
  
      const user = await UserService.login({ accountNumber, password });
    
      if(!user){
        return res.status(400).json({
          status: 'error',
          message: 'Validation error in the database; Account or Password invalid ~_~',
        });
      }
      return res.status(200).json({
        message: 'ᕕ(⌐■_■)ᕗ Are you logged ♪♬',
        user
      });
    } catch (error) {
      console.error(error);
  
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          status: 'error',
          message: 'Validation error in the database.',
          error: error.message
        });
      }
  
      return res.status(500).json({
        status: 'fail',
        message: 'Internal server error during login.',
        error: error.message
      });
    }
  };
  

  export const getHistory =  async(req, res)  => {
    try{
      const { id } = req.params;
      const transactionHistory = await TransferService.getTransactionHistory(id);
  
      return res.status(200).json({
        message: "Transaction history retrieved successfully (⌐■_■)..|..(■_■~)",
        transactions: transactionHistory,
      });
    }catch(error){
      console.error(error)
      return res.status(500).json({
        status: 'fail',
        message: 'Internal server error: Get transaction history (⊙_☉)',
        error
      })
    }
  }

    
  
  
  