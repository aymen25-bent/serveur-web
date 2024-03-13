import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Category from "./category.js";
import Supplier from "./supplier.js";

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity_available: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Product.belongsTo(Category, { foreignKey: "category_id" });
Product.belongsTo(Supplier, { foreignKey: "supplier_id" });

export default Product;
