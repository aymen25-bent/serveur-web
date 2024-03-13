import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.js";
import Supplier from "./supplier.js";
import Product from "./product.js";

const Order = sequelize.define("Order", {
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Order.belongsTo(User, { foreignKey: "user_id", as: "user" });
// Order.belongsTo(Supplier, { foreignKey: "supplier_id", as: "supplier" });
// Order.belongsTo(Product, { foreignKey: "product_id", as: "product" });

Order.sync();

export default Order;
