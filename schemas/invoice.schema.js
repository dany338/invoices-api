const Joi = require('joi');

const id = Joi.number().integer();
const clientId = Joi.number().integer();
const date = Joi.date();
const description = Joi.string().min(3).max(30);
const amount = Joi.number().integer();

const linesSchema = Joi.array().items(
  Joi.object({
    description: description.required(),
    amount: amount.required(),
  })
);

const createSchema = Joi.object({
  clientId,
  date,
  lines: linesSchema.required(),
});

const updateSchema = Joi.object({
  clientId,
  date,
  lines: linesSchema,
});

const getSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSchema, updateSchema, getSchema }
