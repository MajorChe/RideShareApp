const express = require("express");
const validateForm = require("../controller/postRideController");
const router = express.Router();
const {postRideHandler} = require("../controller/postRideController")


router.post("/", postRideHandler)

module.exports = router;