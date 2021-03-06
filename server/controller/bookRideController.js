const BookRideFn = require("../db/queries/bookRide");
const accountSid = process.env.ASID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const updateRideHandler = async (req, res) => {

  const { available_seats, ride_id } = req.body.params;

  console.log(req.body.params)

  BookRideFn.updateSeats(available_seats, ride_id)

    .then(updatedData => {

      console.log("successfully updated data", updatedData);

      res.json(updatedData);

    }).catch((err) => {

      console.log(err.message);

      res.send("failed", err.message);

    })

}

const addBookingHandler = async (req, res) => {

  console.log(req.body.params);

  const { ride_id, rider_id, seats, contact } = req.body.params;

  console.log(contact);

  BookRideFn.addBooking(ride_id, rider_id, seats)

    .then(insertedData => {

      console.log("successfully inserted data", insertedData);

      res.json(insertedData);      

      console.log("result",insertedData );

      const a = insertedData.booking_id;

      client.messages

        .create({

          body: `Booking is Successful ${a} `,
          messagingServiceSid: process.env.MSID,
          to: contact,
          from: process.env.FROM

        })

        .then(message => console.log(message.sid))

        .catch(err=> console.log(err))

        .done();    

    })
    .catch((err) => {

      console.log(err.message);

      res.send("failed", err.message);
    })

}

module.exports = { addBookingHandler, updateRideHandler }