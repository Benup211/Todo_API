const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required().messages({ 'string.min': 'first name should have at least 3 characters', 'string.max': 'first name should have at most 30 characters', 'string.empty': 'first name cannot be empty', 'any.required': 'first name is required' }),
  lastName: Joi.string().min(3).max(30).required().messages({ 'string.min': 'last name should have at least 3 characters', 'string.max': 'last name should have at most 30 characters', 'string.empty': 'last name cannot be empty', 'any.required': 'last name is required' }),
  email: Joi.string().pattern(new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')).required().messages({ 'string.pattern.base': 'Email is not valid' }),
  password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({ 'string.pattern.base': 'Password is not valid' }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password must match the password'
  }),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')).required().messages({ 'string.empty': 'Email cannot be empty', 'any.required': 'Email is required', 'string.pattern.base': 'Email is not valid' }),
  password: Joi.string().required().messages({ 'string.empty': 'Password cannot be empty', 'any.required': 'Password is required' }),
});
const passwordChangeSchema = Joi.object({
  oldPassword: Joi.string().required().messages({ 'string.empty': 'Old password cannot be empty', 'any.required': 'Old password is required' }),
  password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({ 'string.pattern.base': 'Password is not valid' }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password must match the password'
  }),
});
module.exports = { registerSchema, loginSchema, passwordChangeSchema };