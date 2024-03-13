import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    console.log("here", errors.array());
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
