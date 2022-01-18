const express = require("express");
const router = express.Router();
const {updateHandler} = require("../controller/updateController")

router.put("/update", updateHandler);

module.exports = router;
