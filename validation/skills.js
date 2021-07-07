const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSkillsInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.level = !isEmpty(data.level) ? data.level : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.level)) {
    errors.level = "Level field is required";
  }

  if (data.numberOfYears == 0) {
    errors.numberOfYears = "Number of years can't be 0";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
