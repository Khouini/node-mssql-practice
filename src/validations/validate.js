import Joi from 'joi';
import sql from 'mssql';

const studentsSchema = Joi.object({
  firstName: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')),
  lastName: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')),
  age: Joi.number().integer().min(18).max(120),
  ecole_id: Joi.number().integer(),
});

const ecoleSchema = Joi.object({
  name: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')),
});
const studentsSortBySchema = Joi.object({
  sortOrder: Joi.any().valid('asc', 'desc', 'ASC', 'DESC'),
  sortDescription: Joi.any().valid('id', 'firstName', 'lastName', 'age', 'idEcole'),
});
const paginationSchema = Joi.object({
  limit: Joi.number().integer(),
  skip: Joi.number().integer(),
});
const searchSchema = Joi.object({
  searchDescription: Joi.any().valid('id', 'firstName', 'lastName', 'age', 'idEcole'),
});
export { studentsSchema, ecoleSchema, studentsSortBySchema, paginationSchema, searchSchema };
