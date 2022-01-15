const express = require("express");
const validateForm = require("../controller/formValidation");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userfn = require("../db/queries/user");

router.post("/login", (req, res) => {
  validateForm(req, res);
});

router.post("/register", (req, res) => {
  validateForm(req, res);
  console.log("hello1");
  userfn.getUser(req.body.username).then(async (result) => {
    if (result) {
      res.json({ loggedIn: false, status: "Username exists!! Please login" });
    } else {
      const hashedpassword = await bcrypt.hash(req.body.password, 12);
      userfn.postUser(req.body.username, hashedpassword).then((response) => {
        req.session.user = {
          username: req.body.username,
          id: response.id
        }
        res.json({ loggedIn: true, username: req.body.username });
      });
    }
  });
});
module.exports = router;
