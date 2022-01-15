require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 8888;
const session = require("express-session");
const app = express();
const auth = require("./routes/auth");

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

app.use(session({
  secret: process.env.COOKIE_KEY,
  credentials: true,
  saveUninitialized: false,
  name: "sid",
  resave: false,
  cookie: {
    secure: process.env.ENVIRONMENT === "production",
    httpOnly: true,
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax"
  }

}));

app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
