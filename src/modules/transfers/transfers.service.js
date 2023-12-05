import Transfer from "./transfers.model.js";

export class TransferService {

 static async createRecordTransfer(amount, senderUserId, recipientUserId) {
  return await Transfer.create({
    amount: amount,
    senderUserId: senderUserId,
    reciverUserId: recipientUserId
  });
}

static async getTransactionHistory(id) {
  try {
    const transactions = await Transfer.findAll({
      where: {
        [sequelize.Op.or]: [
          { senderUserId: id },
          { reciverUserId: id },
        ],
      },
      include: [
        { model: User, as: "Sender", attributes: ["name", "account"] },
        { model: User, as: "Recipient", attributes: ["name", "account"] },
      ],
    });

    return transactions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

}