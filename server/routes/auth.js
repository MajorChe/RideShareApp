const express = require("express");
const validateForm = require("../controller/formValidation");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userfn = require("../db/queries/user");

router.post("/login", (req, res) => {
  validateForm(req, res);
  userfn.getUser(req.body.username).then(async(result) => {
    if (result) {
      const checkPassword = await bcrypt.compare(req.body.password, result.password);
      if (checkPassword) {
        req.session.user = {
          username: req.body.username,
          id: result.id,
        };
        res.json({ loggedIn: true, status: req.body.username });
      } else {
        console.log("password doesnt match");
        res.json({ loggedIn: false, status: "Wrong username or password" });
      }
    } else {
      console.log("Wrong username");
      res.json({ loggedIn: false, status: "Wrong username or password" });
    }
  });
});

router.post("/register", (req, res) => {
  validateForm(req, res);
  userfn.getUser(req.body.username).then(async (result) => {
    if (result) {
      res.json({ loggedIn: false, status: "Username exists!! Please login" });
    } else {
      const hashedpassword = await bcrypt.hash(req.body.password, 12);
      userfn.postUser(req.body.username, hashedpassword).then((result) => {
        req.session.user = {
          username: req.body.username,
          id: result.id,
        };
        res.json({ loggedIn: true, username: req.body.username });
      });
    }
  });
});
module.exports = router;
