const express = require("express");
const router = express.Router();
const pool = require("../db/db");

module.exports = () => {
  router.get("/", (req, res, next) => {
    let id= req.query.id;
    console.log("1");
    return pool
      .query(`SELECT rides.*,users.name,users.avatar,users.contact,
      to_char(date_of_ride, 'DD/MM/YYYY') as date
      FROM rides
      JOIN users ON users.id = rides.owner_id      
      where rides.ride_id = $1;`,[id])      
      .then((response) => {
        console.log(response.rows[0]);
        return response.rows[0];
      })
      .then((data) => {
        res.json(data);
      });
  });
  return router;
};

