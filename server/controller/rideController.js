const userfn = require("../db/queries/user");
const accountSid = process.env.ASID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const userRidesViewer = async (req, res) => {
  const { id } = req.params;
  const new_id = parseInt(id);
  userfn.getRidesforUser(new_id).then((result) => {
    console.log(result);
    res.json({
      result,
    });
  });
};

const userRidePostings = (req, res) => {
  const { id } = req.params;
  const new_id = parseInt(id);
  console.log("parsed owner id is: ", new_id);
  userfn.getRidePostingsForUser(new_id).then((result) => {
    console.log(result);
    res.json({ result });
  });
};

const userRideBookings = (req, res) => {
  const { id } = req.params;
  const new_id = parseInt(id);
  userfn.getAllBookingsForOwner(new_id).then((result) => {
    console.log(result);
    res.json({ result });
  });
};

const cancelRide = (req, res) => {
  const { id, updated_seats, ride_id } = req.body.params;
  const parsed_id = parseInt(id);
  const parsed_updated_seats = parseInt(updated_seats);
  const parsed_ride_id = parseInt(ride_id);
  userfn.cancelUserRide(parsed_id).then((result) => {
    userfn.updateSeatsOnUserCancel(updated_seats, ride_id).then((result2) => {
      res.json({ result, result2 });
    });
  });
};

const deleteRide = (req, res) => {
  // const { ride_id, updated_seats } = req.body.params;
  const { ride_id } = req.body.params;
  const parsed_ride_id = parseInt(ride_id);
  // const parsed_updated_seats = parseInt(updated_seats);
  userfn.deleteUserRidePosting(parsed_ride_id).then((result) => {
    userfn.updateActive(parsed_ride_id)
    .then((result2) => {
          res.json({ result, result2 });
        });

    // userfn
    //   .updateSeatsOnUserCancel(parsed_updated_seats, parsed_ride_id)
    //   .then((result2) => {
    //     res.json({ result, result2 });
    //   });
  });
};

const approveIndividualBooking = (req, res) => {
  const { id } = req.params;
  const {contact} = req.body.params;
  const new_id = parseInt(id);
  userfn.approveIndividualBooking(new_id).then((result) => {
    res.json({ result });
    
    client.messages

    .create({

      body: `Booking is Approved !see you soon `,
      messagingServiceSid: process.env.MSID,
      to: contact,
      from: process.env.FROM

    })

    .then(message => console.log(message.sid))

    .catch(err=> console.log(err))

    .done();    
  
  });
};

module.exports = {
  userRidesViewer,
  userRidePostings,
  userRideBookings,
  cancelRide,
  deleteRide,
  approveIndividualBooking,
};
