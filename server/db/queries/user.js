const pool = require("../db");

const getUser = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((response) => response.rows[0])
    .catch((err) => console.log("Error is:", err));
};

const postUser = (name, email, password) => {
  return pool
    .query(
      `INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *;`,
      [name, email, password]
    )
    .then((response) => {
      console.log(response.rows[0]);
      return response.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const updateUser = (id, name, email, password, contact) => {
  return pool
    .query(
      `UPDATE users SET name=$1, email=$2, password=$3, contact=$4 WHERE id = $5 RETURNING *;`,
      [name, email, password, contact, id]
    )
    .then((response) => {
      console.log(response.rows[0]);
      return response.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getRidesforUser = async (id) => {
  return await pool
    .query(
      `SELECT rides.ride_id as booked_ride_id, rides.ride_image as ride_image, rides.origin as origin,
        rides.destination as destination, rides.cost as cost, rides.date_of_ride as date,
          rides.time_of_ride as time, bookings.booking_status as status FROM bookings
            JOIN rides ON bookings.ride_id = rides.ride_id WHERE bookings.rider_id = $1;`,
      [id]
    )
    .then((response) => {
      return response.rows; //response is an array of items
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getUser, postUser, updateUser, getRidesforUser };
