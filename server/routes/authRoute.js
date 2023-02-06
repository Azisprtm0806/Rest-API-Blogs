const express = require("express");
const {
  getUser,
  protected,
  register,
  login,
  logout,
} = require("../controller/authController");
const { validationMiddleware } = require("../middleware/validationMiddleware");
const { userAuth } = require("../middleware/authMiddleware");
const { loginValidation } = require("../validators/loginValidator");

const router = express.Router();

router.get("/get-user", userAuth, getUser);
router.get("/protected", userAuth, protected);
router.post("/register", register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/logout", userAuth, logout);

module.exports = router;
