import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { body } from "express-validator";
import { validate } from "../middlewares/expressValidator.js";

const router = Router();

router.get("/", getAllProducts);
router.post(
  "/",

  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("description")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters long"),
  body("price").isDecimal().withMessage("Price must be a decimal number"),
  body("quantity_available").isInt().withMessage("Quantity must be an integer"),
  body("category_id").isInt().withMessage("Category must be an integer"),
  body("supplier_id").isInt().withMessage("Supplier must be an integer"),
  validate,

  createProduct
);
router.put(
  "/:id",

  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("description")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters long"),
  body("price").isDecimal().withMessage("Price must be a decimal number"),
  body("quantity_available").isInt().withMessage("Quantity must be an integer"),
  body("category_id").isInt().withMessage("Category must be an integer"),
  body("supplier_id").isInt().withMessage("Supplier must be an integer"),
  validate,
  updateProduct
);
router.delete("/:id", deleteProduct);

export default router;
