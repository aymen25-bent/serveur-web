import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Role from "./role.js";

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoPath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.belongsTo(Role, { foreignKey: "roleId" });

export default User;
