const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieparser = require("cookie-parser");
const allroutes = require("./app/allroutes");
const connectmongodb = require("./app/config/mongooseconnection");
const { redisconnect } = require("./app/config/redisconnection");
const helmet = require("helmet");
require("dotenv").config();

app.use(helmet({
  crossOriginResourcePolicy: {
    policy: "cross-origin",
  },
}));
//accepting the json for
app.use(express.json());
//activating cookies parsing
app.use(cookieparser());
//accessing uploads folder from frontend
app.use("/uploads", express.static("uploads"));

// cors credentials
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
// routes connection
app.use(allroutes);

// database connection
redisconnect();
connectmongodb(app);
