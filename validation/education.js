const validator = require("validator");
const is_Empty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.school = !is_Empty(data.school) ? data.school : "";
  data.degree = !is_Empty(data.degree) ? data.degree : "";
  data.fieldofstudy = !is_Empty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !is_Empty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "school field is required";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree is required";
  }

  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};
