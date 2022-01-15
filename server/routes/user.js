const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userfn = require("../db/queries/user");

/* GET users listing. */
module.exports = () => {
  router.post("/login", (req, res) => {
    console.log(req.body);
    const {email,password} = req.body;
    console.log(email);
    console.log(password)
    userfn.getUser(email).then((user) => {
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          req.session.id = user.id;
          console.log(result.data)
          res.json(result);
        } else {
          console.log("invalid");
        }
      });
    });
  });
  return router;
};
