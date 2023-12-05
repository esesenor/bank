import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

const Transfer = sequelize.define("Transfers", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  reciverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  transferDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Transfer;
