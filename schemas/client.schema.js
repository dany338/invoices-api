const Joi = require('joi');

const id = Joi.number().integer();
const dni = Joi.string().min(4);
const firstName = Joi.string().min(3);
const lastName = Joi.string().min(3);

const createSchema = Joi.object({
  dni: dni.required(),
  firstName: firstName.required(),
  lastName: lastName.required()
});

const updateSchema = Joi.object({
  dni: dni,
  firstName: firstName,
  lastName: lastName,
});

const getSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSchema, updateSchema, getSchema }
