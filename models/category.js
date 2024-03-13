import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define("Category", {
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Category;
