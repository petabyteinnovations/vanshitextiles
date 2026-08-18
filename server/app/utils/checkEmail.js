let validemail = ["gmail", "yahoo", "apple", "bing"];
let lastenxtension = ["com", "in"];
const checkEmail = (email) => {
  let validateEmail = email.split(/[@.]/);
  let isvalidemail = validemail.includes(validateEmail[1]);
  let isvalidemailextension = lastenxtension.includes(validateEmail[2]);
  if (validateEmail.length === 3 && isvalidemail && isvalidemailextension) {
    return true;
  } else {
    return false;
  }
};

module.exports = checkEmail;
