const validator = require("validator");
const is_Empty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !is_Empty(data.title) ? data.title : "";
  data.company = !is_Empty(data.company) ? data.company : "";
  data.from = !is_Empty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Job title is required";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "Company is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};
