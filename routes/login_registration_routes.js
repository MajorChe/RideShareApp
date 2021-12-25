const express = require("express");
const router = express.Router();
const userfn = require("../lib/queries/publicQueries");
const bcrypt = require("bcryptjs");

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get("/login", (req, res) => {
    const login_active = "is-active";
    const register_active = null;
    res.render("login", { login_active, register_active });
  });

  router.post("/login", (req, res) => {
    const errors = [];
    userfn
      .getUser(req.body.email)
      .then((user) => {
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (result) {
            req.session.id = user.id;
            res.redirect("/");
          } else {
            let login_active = "is-active";
            let register_active = null;
            errors.push({ msg: "Please check your credentials" });
            res.render("login", { errors, login_active, register_active });
          }
        });
      })
      .catch((err) => {
        let login_active = "is-active";
        let register_active = null;
        errors.push({ msg: "Please check your credentials" });
        res.render("login", { errors, login_active, register_active });
      });
  });

  router.post("/register", (req, res) => {
    const { email, name, contact, password, confirm_password } = req.body;
    const errors = [];

    if (password != confirm_password) {
      errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
      let login_active = null;
      let register_active = "is-active";
      res.render("login", { errors, login_active, register_active });
    }
    userfn.getUser(email).then(async(result) => {
      if (result) {
        let login_active = null;
        let register_active = "is-active";
        errors.push({ msg: "Email already registered! Please login" });
        res.render("login", { errors, login_active, register_active });
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        userfn
          .postUser(email, name, contact, hashedPassword)
          .then((response) => {
            req.session.id = response.id;
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });

  return router;
};
