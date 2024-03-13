import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Product from "./product.js";

const StockTransaction = sequelize.define("StockTransaction", {
  type: {
    type: DataTypes.ENUM("IN", "OUT"),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transaction_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

StockTransaction.belongsTo(Product, { foreignKey: "product_id" });

export default StockTransaction;
