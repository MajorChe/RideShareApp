const Redis = require("ioredis");
require("dotenv").config();
const redisClient = new Redis();
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const sessionMiddleware = session({
    secret: process.env.COOKIE_KEY,
    credentials: true,
    saveUninitialized: false,
    name: "sid",
    store: new RedisStore({client: redisClient}),
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      // expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  });

const wrap = expressMiddleware => (socket,next) => expressMiddleware(socket.request, {}, next);

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
}

const authorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad request!");
    next(new Error("Not authorized"));
  } else {
    socket.user = {...socket.request.session.user};
    redisClient.hset(`chatid:${socket.user.email}`,"chatid",socket.user.chatid,)
    next();
  }
};
  module.exports = {sessionMiddleware, wrap, corsConfig, authorizeUser};