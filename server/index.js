require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 8888;
const { Server } = require("socket.io");
const app = express();
const rideRoute = require("./routes/ride");
const auth = require("./routes/auth");
const user = require("./routes/user");
const post = require("./routes/postRoute");
const book = require("./routes/bookRoute");
const listRidesRoute = require("./routes/listRides");
const dbConnection = require("./db/db");
const { sessionMiddleware, wrap, corsConfig, authorizeUser } = require("./controller/serverController");
const server = require("http").createServer(app);

app.use(cors(corsConfig));

const io = new Server(server, {
  cors: corsConfig,
});

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(sessionMiddleware);

app.use("/getRides", listRidesRoute(dbConnection));
app.use("/ride", rideRoute(dbConnection));
app.use("/auth", auth);
app.use("/user",user);
app.use("/postRide", post);
app.use("/book",book);

io.use(wrap(sessionMiddleware))
io.use(authorizeUser);

io.on("connect", socket => {
  console.log("chatid", socket.user.chatid);
  console.log(socket.request.session.user.name);
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
