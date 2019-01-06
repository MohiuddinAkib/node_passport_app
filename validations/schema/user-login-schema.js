const Joi = require('joi');

const UserLoginSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .min(5)
    .max(255)
    .label('Email')
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .max(255)
    .trim()
    .label('Password')
    .required()
});

module.exports = UserLoginSchema;
