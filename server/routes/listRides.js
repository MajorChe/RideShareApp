require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db/db");

var axios = require("axios");

module.exports = () => {
  router.get("/", async (req, res, next) => {
    let from = req.query.from;
    let to = req.query.to;
    let date = req.query.date;
    let only = req.query.only;

    console.log("from", from);
    console.log("to", to);
    console.log("date", date);
    const queryParams = [];
    let queryString = `SELECT rides.*,users.name,users.avatar,users.contact,
                            to_char(date_of_ride, 'DD/MM/YYYY') as date
                            FROM rides
                            JOIN users ON users.id = rides.owner_id 
                            WHERE available_seats > 0 and 1=1 `;
    if (date) {
      queryParams.push(`${date}`);
      queryString += ` AND date_of_ride = $${queryParams.length}`;
      // console.log(queryString);
    }

    pool
      .query(queryString, queryParams)
      .then((response) => {
        return response.rows;
      })
      .then(result => {

        if (from === "initial") {
          // console.log("initial rendering type", typeof (rides));
          res.json(result);
        }
        //======= i

        else if (only === "exact") {
          // console.log("initial rendering type", typeof (rides));
          let onlyResult =[]
          for (const ride of result) {           
            if (to === ride.destination && from=== ride.origin) {
              console.log(ride);
              onlyResult.push(ride);
            }
          }   
          res.json(onlyResult);
        }
        //===============================
        else {
          rides = [];
          let result2 = [];
          // console.log("in post result", result2);
          let axios_dist = [];
          for (const ride of result) {
            if (to === ride.destination) {
              console.log(ride);
              result2.push(ride);

            }

          }

          //compute distance for each entry and then only render based on distance < 50
          for (const ride of result2) {
            var config = {
              method: 'get',
              url: `https://maps.googleapis.com/maps/api/directions/json?origin=${ride.origin}&destination=${from}&units=metric&mode=driving&key=${process.env.KEY}`,
              headers: {}
            };
            axios(config)
              .then(function (response) {
                let obj = JSON.stringify(response.data);
                const object = JSON.parse(obj);
                let distance = object.routes[0].legs[0].distance.text.split(" ")[0];
                // console.log("distance",distance);
                // console.log("ride", ride);
                axios_dist.push(distance);
                if (Number(distance) < 50) {
                  rides.push(ride);
                  // console.log("rides", rides);
                }
                console.log(axios_dist);
                if (axios_dist.length === result2.length) {
                  console.log("rides after dista axios", rides);

                  res.json(rides);
                }

              }).catch((err) => {
                console.log(err.message);
              })  //axios    
          }//for 

        }
      })
  });
  return router;
};




