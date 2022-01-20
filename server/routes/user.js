const express = require("express");
const router = express.Router();
const { userRidesViewer, userRidePostings, userRideBookings,cancelRide } = require("../controller/rideController");
const {updateHandler} = require("../controller/updateController");

router.put("/update", updateHandler);

router.get("/view/:id", userRidesViewer);

router.get("/viewpostings/:id", userRidePostings);

router.get("/viewpostings/bookings/:id", userRideBookings);

router.put("/cancelride/:id",cancelRide);

module.exports = router;
