const validator = require("validator");
const is_Empty = require("./is-empty");

module.exports = validateRegisterInput = data => {
  let errors = {};

  data.name = !is_Empty(data.name) ? data.name : "";
  data.email = !is_Empty(data.email) ? data.email : "";
  data.password = !is_Empty(data.password) ? data.password : "";
  data.passwordTwo = !is_Empty(data.passwordTwo) ? data.passwordTwo : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.passwordTwo)) {
    errors.passwordTwo = "Password field is required";
  }

  if (!validator.equals(data.password, data.passwordTwo)) {
    errors.passwordTwo = "Passwords must match";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};
