let mongoose = require("mongoose");
require("dotenv").config();

let connectmongodb = (app) => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log("Server working fine");
      });
    })
    .catch(() => {
      console.log("Server not working");
    });
};

module.exports = connectmongodb;
