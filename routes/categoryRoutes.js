import { Router } from "express";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { body } from "express-validator";
import { validate } from "../middlewares/expressValidator.js";

const router = Router();

router.get("/", getAllCategories);
router.post(
  "/",
  body("category_name")
    .isLength({ min: 1 })
    .withMessage("Category name is required"),
  validate,
  createCategory
);
router.put(
  "/:id",
  body("category_name")
    .isLength({ min: 1 })
    .withMessage("Category name is required"),
  validate,
  updateCategory
);
router.delete("/:id", deleteCategory);

export default router;
