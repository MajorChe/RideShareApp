const express = require("express");
const router = express.Router();
const { userRidesViewer, userRidePostings, userRideBookings, cancelRide, deleteRide, 
  approveIndividualBooking, cancelIndividualBooking } = require("../controller/rideController");
const {updateHandler} = require("../controller/updateController");

router.put("/update", updateHandler);

router.get("/view/:id", userRidesViewer);

router.get("/viewpostings/:id", userRidePostings);

router.get("/viewpostings/bookings/:id", userRideBookings);

router.put("/cancelride/:id",cancelRide);

router.put("/deleteride/:id",deleteRide);

router.put("/approve/:id",approveIndividualBooking);

router.put("/cancel/:id",cancelIndividualBooking);

module.exports = router;
