const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  forgotpassword,
  resetpassword,
} = require("../controllers/auth");

const { protect } = require("../middleware/auth");

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, getMe);

router.post("/forgotpassword", forgotpassword);

router.put("/resetpassword/:resettoken", resetpassword);

module.exports = router;
