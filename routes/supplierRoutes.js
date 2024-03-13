import { Router } from "express";

import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController.js";
import { body } from "express-validator";
import { validate } from "../middlewares/expressValidator.js";

const router = Router();

router.get("/", getAllSuppliers);
router.post(
  "/",

  body("name").isString().withMessage("name is required"),
  body("phone").isString().withMessage("phone is required"),
  body("email").isEmail().withMessage("email is required"),
  body("address").isString().withMessage("address is required"),
  validate,
  createSupplier
);
router.put(
  "/:id",

  body("name").isString().withMessage("name is required"),
  body("phone").isString().withMessage("phone is required"),
  body("email").isEmail().withMessage("email is required"),
  body("address").isString().withMessage("address is required"),
  validate,
  updateSupplier
);
router.delete("/:id", deleteSupplier);

export default router;
