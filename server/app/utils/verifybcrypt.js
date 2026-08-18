let bcrypt = require("bcrypt");

const verifybcrypt = async (value, hashpassword) => {
  let encryptedsalts = await bcrypt.compare(value, hashpassword);
  return encryptedsalts;
};

module.exports = verifybcrypt;
