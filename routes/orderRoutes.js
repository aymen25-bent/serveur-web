import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/orderController.js";
import { body } from "express-validator";
import { validate } from "../middlewares/expressValidator.js";

const router = Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post(
  "/",
  body("order_date").isDate().withMessage("order_date is required"),
  body("status").isString().withMessage("status is required"),
  body("total_amount").isDecimal().withMessage("total_amount is required"),

  body("user_id").isLength({ min: 1 }).withMessage("user_id is required"),
  body("supplier_id")
    .isLength({ min: 1 })
    .withMessage("supplier_id is required"),
  body("product_id").isLength({ min: 1 }).withMessage("product_id is required"),
  validate,
  createOrder
);
router.put(
  "/:id",
  body("order_date").isDate().withMessage("order_date is required"),
  body("status").isString().withMessage("status is required"),
  body("total_amount").isDecimal().withMessage("total_amount is required"),

  body("user_id").isLength({ min: 1 }).withMessage("user_id is required"),
  body("supplier_id")
    .isLength({ min: 1 })
    .withMessage("supplier_id is required"),
  body("product_id").isLength({ min: 1 }).withMessage("product_id is required"),
  validate,
  updateOrder
);
router.delete("/:id", deleteOrder);

export default router;
