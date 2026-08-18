let express = require("express");
const webroutes = require("./routes/web/WebRoutes");
const adminroutes = require("./routes/admin/AdminRoutes");
const expressSession = require("express-session");
let allroutes = express.Router();
require('dotenv').config();

let websession = expressSession({
  name: "websession",
  secret: process.env.WEBSESSIONTOKEN,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // Prevent JS access
    secure: false, // Set to `true` in production (HTTPS)
    sameSite: "lax", // Ensures cookies are sent correctly
    maxAge: 2 * 60 * 60 * 1000, // 60 minute
  },
});

let adminsession = expressSession({
  name: "adminsession",
  secret: process.env.ADMINSESSIONTOKEN,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // Prevent JS access
    secure: false, // Set to `true` in production (HTTPS)
    sameSite: "lax", // Ensures cookies are sent correctly
    maxAge: 2 * 60 * 60 * 1000, // 60 minute
  },
});

allroutes.use("/web", websession, webroutes);
allroutes.use("/admin", adminsession, adminroutes);
module.exports = allroutes;
