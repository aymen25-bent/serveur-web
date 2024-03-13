import express from "express";
import {
  getAllUsers,
  getLoggedUser,
  createUser,
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import { body } from "express-validator";
import { validate } from "../middlewares/expressValidator.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/loggedUser", getLoggedUser);
router.post(
  "/",
  body("firstName").isString().withMessage("firstName is required"),
  body("lastName").isString().withMessage("lastName is required"),
  body("birthDate").isDate().withMessage("birthDate is required"),
  body("phoneNumber").isString().withMessage("phoneNumber is required"),
  body("email").isEmail().withMessage("email is required"),
  body("password").isString().withMessage("password is required"),
  body("role_id").isInt().withMessage("role_id is required"),

  validate,
  createUser
);
router.post(
  "/login",
  body("email").isEmail().withMessage("email is required"),
  body("password").isString().withMessage("password is required"),
  validate,
  loginUser
);
router.post(
  "/register",

  body("firstName").isString().withMessage("firstName is required"),
  body("lastName").isString().withMessage("lastName is required"),
  body("birthDate").isDate().withMessage("birthDate is required"),
  body("phoneNumber").isString().withMessage("phoneNumber is required"),
  body("email").isEmail().withMessage("email is required"),
  body("password").isString().withMessage("password is required"),
  body("role_id").isInt().withMessage("role_id is required"),
  validate,
  registerUser
);
router.put(
  "/:id",

  body("firstName").isString().withMessage("firstName is required"),
  body("lastName").isString().withMessage("lastName is required"),
  body("birthDate").isDate().withMessage("birthDate is required"),
  body("phoneNumber").isString().withMessage("phoneNumber is required"),
  body("email").isEmail().withMessage("email is required"),
  body("password").isString().withMessage("password is required"),
  body("role_id").isInt().withMessage("role_id is required"),

  validate,
  updateUser
);
router.delete("/:id", deleteUser);

export default router;
