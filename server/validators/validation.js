const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");

// From validation
exports.validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: PasswordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};
