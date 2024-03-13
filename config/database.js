import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default sequelize;
