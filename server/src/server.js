const { errorHandler } = require("./middlewares/errorhandler.middleware");
const express = require("express");
const { localStrategy, jwtStrategy } = require("./config/passport.config");
var cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes");
const passport = require("passport");
// const cors = require('cors')

const server = express();

// server.use(cors({origin:'http://localhost:3000', credentials: true})) 
server.use(express.static(path.resolve(__dirname, "../..", "client/build")));

server.use(cookieParser());
server.use(express.json());

passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

server.use(
  "/api",
  routes
);
server.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../..", "client/build", "index.html"))
);

server.use(errorHandler);

module.exports = server;
