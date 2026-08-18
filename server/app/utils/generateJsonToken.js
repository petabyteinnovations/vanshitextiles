const jwt = require("jsonwebtoken");
require('dotenv').config();


const generateJsonToken = (value, envcredential) => {
  return jwt.sign({ value }, envcredential, {
    expiresIn: "2h",
  });
};

module.exports = generateJsonToken;
