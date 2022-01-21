require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 8888;
const app = express();
const rideRoute = require("./routes/ride");
const auth = require("./routes/auth");
const user = require("./routes/user");
const post = require("./routes/postRoute");
const book = require("./routes/bookRoute");
const session = require("express-session");
const listRidesRoute = require("./routes/listRides");
const dbConnection = require("./db/db");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    credentials: true,
    saveUninitialized: false,
    name: "sid",
    resave: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true,
      // expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);

app.use("/getRides", listRidesRoute(dbConnection));
app.use("/ride", rideRoute(dbConnection));
app.use("/auth", auth);
app.use("/user",user);


app.use("/postRide", post);
app.use("/book",book);
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
