const pool = require("../db");


const postRide = (owner_id,origin,destination,available_seats,date_of_ride,time_of_ride,cost,image) => {
  return pool
    .query(
      `INSERT INTO rides 
            (owner_id,origin,destination,available_seats,date_of_ride,time_of_ride,cost,ride_image)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`, 
             [owner_id,origin,destination,available_seats,date_of_ride,time_of_ride,cost,image]
               
    )
    .then((response) => {
      console.log(response.rows[0]);
      return response.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { postRide };