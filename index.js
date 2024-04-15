import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

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
app.use(
  cors({
    origin: "*",
  })
);

// app.use(authenticateJWT);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename files to avoid conflicts
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("photo"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const url = `${req.protocol}://${req.hostname}:${PORT}`;

  file.url = `${url}/uploads/${file.filename}`;

  console.log("url", file.url);

  res.json({ url: file.url });
});

app.use("/uploads", express.static("uploads"));

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
