import { Router } from "express";

import {
  getAllStockTransactions,
  createStockTransaction,
  updateStockTransaction,
  deleteStockTransaction,
} from "../controllers/stockTransactionController.js";
import { body } from "express-validator";
import { validate } from "../middlewares/expressValidator.js";

const router = Router();

router.get("/", getAllStockTransactions);
router.post(
  "/",
  body("type").isString().withMessage("type is required"),
  body("quantity").isInt().withMessage("quantity is required"),
  body("transaction_date")
    .isString()
    .withMessage("transaction_date is required"),
  body("remarks").isString().withMessage("remarks is required"),
  body("product_id").isInt().withMessage("product_id is required"),
  validate,
  createStockTransaction
);
router.put(
  "/:id",
  body("type").isString().withMessage("type is required"),
  body("quantity").isInt().withMessage("quantity is required"),
  body("transaction_date")
    .isString()
    .withMessage("transaction_date is required"),
  body("remarks").isString().withMessage("remarks is required"),
  body("product_id").isInt().withMessage("product_id is required"),
  validate,
  updateStockTransaction
);
router.delete("/:id", deleteStockTransaction);

export default router;
