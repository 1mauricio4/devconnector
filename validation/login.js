const validator = require("validator");
const is_Empty = require("./is-empty");

module.exports = validateLoginInput = data => {
  let errors = {};

  data.email = !is_Empty(data.email) ? data.email : "";
  data.password = !is_Empty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};
