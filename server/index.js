require("dotenv").config();
const express = require("express");
const logger = require("morgan");
// const bodyParser = require('body-parser');
const cors = require("cors");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 8000;
const app = express();
const rideRoute = require("./routes/ride");
const users = require("./routes/user");
const listRidesRoute= require("./routes/listRides");
const dbConnection = require("./db/db");

app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use("/getRides", listRidesRoute(dbConnection));
app.use("/ride", rideRoute(dbConnection));
app.use("/", users(dbConnection));


app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
