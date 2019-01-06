const Joi = require('Joi'),
  PasswordComplexity = require('joi-password-complexity'),
  isEmpty = require('../helpers/isEmpty'),
  UserRegisterSchema = require('./schema/user-register-schema');

module.exports = data => {
  const errors = {};
  const values = {};

  UserRegisterSchema.validate(data, (error, value) => {
    if (error) {
      ({
        details: [
          {
            message,
            context: { key }
          }
        ]
      } = error);
      errors[key] = message;
      return;
    }

    const complexityOptions = {
      min: 6,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4
    };

    // Password complexity
    Joi.validate(
      data.password,
      new PasswordComplexity(complexityOptions),
      err => {
        if (err) {
          errors.password =
            'Password must contain capital letter, small letter, number and symbol';
          return;
        }
      }
    );

    // Setting the values
    for (const key in value) {
      const element = value[key];
      values[key] = element;
    }
  });

  return {
    errors,
    values,
    isValid: isEmpty(errors)
  };
};
