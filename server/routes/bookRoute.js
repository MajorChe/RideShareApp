const express = require("express");
const validateForm = require("../controller/bookRideController");
const router = express.Router();
const {addBookingHandler,updateRideHandler} = require("../controller/bookRideController");

router.post("/new", addBookingHandler);

router.put("/update",updateRideHandler);

module.exports = router;