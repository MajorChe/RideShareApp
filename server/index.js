require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const PORT = process.env.PORT || 8888;
const app = express();
const rideRoute = require("./routes/ride");
const users = require("./routes/user");
const dbConnection = require("./db/db");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/ride", rideRoute(dbConnection));
app.use("/users", users());

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
