require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 8888;
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

app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
