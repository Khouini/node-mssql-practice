import Joi from 'joi';
const studentsSchema = Joi.object({
  firstName: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')),
  lastName: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')),
  age: Joi.number().integer().min(18).max(120),
  ecole_id: Joi.number().integer(),
});

const ecoleSchema = Joi.object({
  name: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')),
});

export { studentsSchema, ecoleSchema };
