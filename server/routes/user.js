const express = require("express");
const router = express.Router();
const { userRidesViewer } = require("../controller/rideController");
const {updateHandler} = require("../controller/updateController")

router.put("/update", updateHandler);

router.get("/view/:id", userRidesViewer);

module.exports = router;
