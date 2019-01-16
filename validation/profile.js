const validator = require("validator");
const is_Empty = require("./is-empty");

module.exports = validateProfileInput = data => {
  let errors = {};

  data.handle = !is_Empty(data.handle) ? data.handle : "";
  data.status = !is_Empty(data.status) ? data.status : "";
  data.skills = !is_Empty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Handle must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Profile status is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  if (!is_Empty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!is_Empty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!is_Empty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!is_Empty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!is_Empty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!is_Empty(data.isntagram)) {
    if (!validator.isURL(data.isntagram)) {
      errors.isntagram = "Not a valid URL";
    }
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};
