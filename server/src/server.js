const { errorHandler } = require("./middlewares/errorhandler.middleware");
const express = require("express");
const { localStrategy, jwtStrategy } = require("./config/passport.config");
var cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const { format } = require("date-fns");

const server = express();

morgan.token("date", function () {
  return format(new Date(), "dd-MMMM-yyyy-hh:mm:ss a");
});

server.use(morgan(":date :method :url :status :response-time ms"));

server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(express.static(path.resolve(__dirname, "../..", "my-app2/dist")));

server.use(cookieParser());

server.use(express.json());

server.use((req, res, next) => {
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Keep-Alive", "timeout=5, max=100");

  //Enable Vercel caching (1 day cache)
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  next();
});

passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

server.use("/api", routes);
server.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../..", "my-app2/dist", "index.html"))
);

server.use(errorHandler);

module.exports = server;
