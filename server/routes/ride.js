const express = require("express");
const router = express.Router();
const pool = require("../db/db");

module.exports = () => {
  router.get("/", (req, res, next) => {
    return pool
      .query(`SELECT * FROM users`)
      .then((response) => {
        return response.rows[0];
      })
      .then((data) => {
        res.json(data);
      });
  });
  return router;
};

