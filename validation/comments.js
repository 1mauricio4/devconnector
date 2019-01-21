const validator = require("validator");
const is_Empty = require("./is-empty");

module.exports = ValidateCommentsInput = data => {
  let errors = {};

  data.text = !is_Empty(data.text) ? data.text : "";

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};
