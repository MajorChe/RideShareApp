const express = require("express");
const validateForm = require("../controller/formValidation");
const router = express.Router();
const {checkCookies, handleLogin, handleRegister, handleLogout} = require("../controller/authController")

router.route("/login").get(checkCookies).post(validateForm, handleLogin);

router.post("/register", validateForm, handleRegister);

router.post("/logout", handleLogout)

module.exports = router;
