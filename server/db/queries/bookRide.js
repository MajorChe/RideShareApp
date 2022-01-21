const pool = require("../db");


const addBooking = (ride_id,rider_id,seats) => {
  let booking_status='pending';
  return pool
    .query(
      `INSERT INTO bookings (ride_id,rider_id,seats,booking_status) VALUES ($1,$2,$3,$4) RETURNING *;`      
                          , [ride_id,rider_id,seats,booking_status]             
    )
    .then((response) => {
      console.log(response.rows[0]);
      return response.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const  updateSeats = (available_seats,ride_id) => { 
  return pool
    .query(
      `UPDATE rides SET available_seats=$1 WHERE ride_id = $2 RETURNING *;`,
      [available_seats,ride_id]                
    )
    .then((response) => {
      console.log(response.rows[0]);
      return response.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = {addBooking,updateSeats};