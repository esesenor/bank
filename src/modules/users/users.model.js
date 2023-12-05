// Importa DataTypes y sequelize desde Sequelize
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";


// Define el modelo de usuario
const User = sequelize.define("Users", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(value, saltRounds);
      this.setDataValue("password", hashedPassword);
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    defaultValue: 1000,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
    allowNull: false,
  },
});

export default User;
