const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.conf_password = !isEmpty(data.conf_password) ? data.conf_password : "";

  if (!Validator.isLength(data.username, { min: 1, max: 20 })) {
    errors.username = "Username must be between 6 and 20 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Enter valid email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.equals(data.password, data.conf_password)) {
    errors.conf_password = "Passwords must match";
  }

  if (!Validator.isLength(data.conf_password, { min: 6, max: 30 })) {
    errors.conf_password =
      "Confirmation password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.conf_password)) {
    errors.conf_password = "Confirmation password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
