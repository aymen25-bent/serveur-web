import { Router } from "express";

import {
  getAllRoles,
  createRole,
  deleteRole,
  updateRole,
} from "../controllers/roleController.js";
import { body } from "express-validator";
import { validate } from "../middlewares/expressValidator.js";

const router = Router();

router.get("/", getAllRoles);
router.post(
  "/",

  body("name").isString().withMessage("name is required"),
  validate,
  createRole
);
router.put(
  "/:id",
  body("name").isString().withMessage("name is required"),
  validate,
  updateRole
);
router.delete("/:id", deleteRole);

export default router;
