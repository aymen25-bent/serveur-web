import express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";

import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import suppplierRoutes from "./routes/supplierRoutes.js";
import stockTransactionRoutes from "./routes/stockTransactionRoutes.js";
import { authenticateJWT } from "./middlewares/authMiddleware.js";
// import passport from "passport";
import passport from "./config/passportConfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(passport.initialize());

// app.use(authenticateJWT);

app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/suppliers", suppplierRoutes);
app.use("/stockTransactions", stockTransactionRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
