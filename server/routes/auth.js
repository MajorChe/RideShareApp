const express = require("express");
const validateForm = require("../controller/formValidation");
const router = express.Router();

router.post("/login", (req, res) => {
  validateForm(req, res);
});

router.post("/register", (req, res) => {
  validateForm(req, res);
});
module.exports = router;