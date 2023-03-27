import { body } from "express-validator";
export const signupValidator = [
    body("username")
      .exists()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long."),
    body("name")
      .exists()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long."),
    body("email")
      .exists()
      .isEmail()
      .withMessage("Email must be valid")
      .normalizeEmail(),
    body("password")
      .exists()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ]