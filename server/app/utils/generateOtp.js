const generateotp = (value) => {
  let chars = "1!@2345#%67890qwerty()-=[]uiopasdfghjkllzxcvbnm^&*}{";
  let length = value;
  let otp = "";
  for (var i = 0; i < length; i++) {
    let randomposition = Math.floor(Math.random() * chars.length);
    otp += chars[randomposition];
  }
  return otp;
};

module.exports = generateotp;
