const isEmpty = require('../helpers/isEmpty'),
  UserLoginSchema = require('./schema/user-login-schema');

module.exports = data => {
  const errors = {};
  const values = {};

  UserLoginSchema.validate(data, (error, value) => {
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
