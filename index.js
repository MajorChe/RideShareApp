require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 3000;

const dbConnection = require("./lib/db");
//morgan middleware
app.use(morgan("dev"));

//ejs template used to render client side pages
app.set("view engine", "ejs");

//body parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//setup cookie sessions

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

//resource routes defined
const publicRoutes = require("./routes/login_registration_routes");
app.use("/", publicRoutes(dbConnection));

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
