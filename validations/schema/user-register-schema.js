const Joi = require('joi');

const UserRegisterSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .min(2)
    .max(55)
    .label('Username')
    .required(),
  email: Joi.string()
    .trim()
    .min(5)
    .max(255)
    .label('Email')
    .email()
    .regex(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    )
    .error(error => {
      if (error[0].type === 'string.regex.base') {
        error[0].message = 'Email must be a valid email';
      }
      return error;
    })
    .required(),
  password: Joi.string()
    .min(6)
    .max(255)
    .trim()
    .label('Password')
    .required(),
  password_confirmation: Joi.any()
    .label('Confirm password')
    .valid(Joi.ref('password'))
    .required()
    .options({ language: { any: { allowOnly: 'must match password' } } })
});

module.exports = UserRegisterSchema;
