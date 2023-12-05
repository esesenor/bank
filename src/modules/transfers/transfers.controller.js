import { UserService } from "../users/users.service.js";
import { TransferService } from "./transfers.service.js";


export const makeTransfer = async (req, res) => {
  try {
    const { amount, recipeAccountNumber, senderAccountNumber } = req.body;

    const recipientUserPromise = UserService.findOneAccount(recipeAccountNumber)
    const senderUserPromise = UserService.findOneAccount(senderAccountNumber)

    const [recipientUser, senderUser] = await Promise.all([recipientUserPromise, senderUserPromise])

    if(!recipientUser){
      return res.status(400).json({
        status:"error",
        message: "Recipient account does not exist"
      })
    }

    if(!senderUser){
      return res.status(400).json({
        status:"error",
        message: "Sender account does not exist"
      })
    }

    if(amount > senderUser.amount){
      return res.status(400).json({
        status:"error",
        message: "Insuficient balance"
      })
    }

    const newRecipientBalance = amount + recipientUser.amount
    const newSenderBalance = senderUser.amount - amount

    await UserService.updateAmount(recipeAccountNumber, newRecipientBalance)
    await UserService.updateAmount(senderAccountNumber, newSenderBalance)
    await TransferService.createRecordTransfer(amount, senderUser.id, recipientUser.id)
    //await Promise.all([a1, a2, a3]) // optimizar await

 
    res.status(201).json({
      message: "Transfer OK (⌐■_■)..|..(■_■~)"
    });
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! ---- ༼つಠ益ಠ༽つ ─=≡ΣO))",
    });
  }
  //ctrl + S
};


