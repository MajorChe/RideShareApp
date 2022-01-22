const express = require("express");
const router = express.Router();
const { userRidesViewer, userRidePostings, userRideBookings, cancelRide, deleteRide, 
  approveIndividualBooking, cancelIndividualBooking } = require("../controller/rideController");
const {updateHandler} = require("../controller/updateController");

router.put("/update", updateHandler);

router.get("/view/:id", userRidesViewer);

router.get("/viewpostings/:id", userRidePostings);

router.get("/viewpostings/bookings/:id", userRideBookings);

router.put("/cancelride",cancelRide);

router.put("/deleteride",deleteRide);

router.put("/approve/:id",approveIndividualBooking);

module.exports = router;
