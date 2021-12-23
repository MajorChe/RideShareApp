require("dotenv").config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const dbConnection = require("./lib/db")
//morgan middleware
app.use(morgan("dev"));

//ejs template used to render client side pages
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/',(req,res) => {
  res.render("index")
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})