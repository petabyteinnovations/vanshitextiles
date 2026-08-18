const bcrypt = require("bcrypt");

const bcryptgenerate = async (value) => {
  const saltrounds = 10;
  let encryptedsalts = await bcrypt.genSalt(saltrounds);
  let encrypteddata = await bcrypt.hash(value, encryptedsalts);
  return encrypteddata;
};

module.exports = bcryptgenerate;
