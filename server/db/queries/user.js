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
      `SELECT rides.ride_id as booked_ride_id, rides.ride_image as ride_image,users.avatar as owner_image,users.name as owner_name, rides.origin as origin,
        rides.destination as destination, rides.cost as cost, rides.date_of_ride as date,
          rides.time_of_ride as time,bookings.booking_id, bookings.seats_booked as seats_booked, bookings.booking_status as status FROM bookings
            JOIN rides ON bookings.ride_id = rides.ride_id 
            JOIN users ON rides.owner_id = users.id
            WHERE bookings.rider_id = $1;`,
      [id]
    )
    .then((response) => {
      return response.rows; //response is an array of items
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getRidePostingsForUser = (owner_id) => {
  return pool
  .query(
    `SELECT ride_id, origin, is_active, destination, available_seats FROM rides WHERE owner_id = $1;`,
    [owner_id]
  )
  .then((response) => {
    return response.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getAllBookingsForOwner = (owner_id) => {
  return pool
  .query(
    `SELECT bookings.booking_id, rides.ride_id, users.name, users.contact, bookings.rider_id, bookings.seats_booked, bookings.booking_status FROM bookings JOIN rides ON 
    bookings.ride_id = rides.ride_id JOIN users ON bookings.rider_id = users.id WHERE owner_id = $1`,
    [owner_id]
  )
  .then((response) => {
    return response.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
};

const cancelUserRide = (booking_id) => {
  return pool
  .query(
    `UPDATE bookings SET booking_status='cancelled' WHERE booking_id = $1 RETURNING *;`,[booking_id]
  )
  .then((response) => {
    console.log("cancelboking response",response.rows[0])
    return response.rows[0]
  })
  .catch((err) => {
    console.log(err.message)
  })
};

const updateSeatsOnUserCancel = (updated_seats, ride_id) => {
  return pool
  .query(
    `UPDATE rides SET available_seats=$1 WHERE ride_id=$2 RETURNING *`,[updated_seats,ride_id]
  ).then((response) => {
    console.log("seats updated after ride cancelled", response.rows[0]);
    return response.rows[0]
  })
  .catch((err) => {
    console.log(err.message)
  })
}

const deleteUserRidePosting = (ride_id) => {
  return pool
  .query(
    `UPDATE bookings SET booking_status='cancelled' WHERE ride_id = $1 RETURNING *;`,[ride_id]
  )
  .then((response) => {
    console.log("cancelrideposting response",response.rows[0])
    return response.rows[0]
  })
  .catch((err) => {
    console.log(err.message)
  })
};

const updateActive = (ride_id) =>{
  return pool
  .query(
    `UPDATE rides SET is_active = false WHERE ride_id = $1 RETURNING *;`,[ride_id]
  )
  .then((response) => {
    console.log("IS ACTIVE TO FALSE",response.rows[0])
    return response.rows[0]
  })
  .catch((err) => {
    console.log(err.message)
  })


}

const approveIndividualBooking = (booking_id) => {
  return pool
  .query(
    `UPDATE bookings SET booking_status='approved' WHERE booking_id = $1 RETURNING *`,[booking_id]
  )
  .then((response) => {
    console.log("individual booking approved: ", response.rows[0])
    return response.rows[0];
  })
  .catch((err) => {
    console.log(err.message)
  })
}


module.exports = { getUser, postUser, updateUser, getRidesforUser,
   getRidePostingsForUser, getAllBookingsForOwner, cancelUserRide, 
   deleteUserRidePosting, updateActive, approveIndividualBooking, updateSeatsOnUserCancel };
