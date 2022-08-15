import sql from 'mssql';
import axios from 'axios';
import { studentsSchema, studentsSortBySchema, paginationSchema, searchSchema } from '../validations/validate.js';
import errorHandler from '../errors/errors.js';
const getStudents = async function (req, res) {
  try {
    let sortDescription = 'id',
      sortOrder = 'asc',
      pagination = '',
      searchField = `where 1 = 1`;
    if (req.query.sortBy) {
      [sortDescription, sortOrder] = req.query.sortBy.split(':');
      await studentsSortBySchema.validateAsync({ sortDescription, sortOrder });
    }
    if (req.query.skip && req.query.limit) {
      const { skip, limit } = req.query;
      await paginationSchema.validateAsync({ skip, limit });
      pagination = `OFFSET ${limit} rows fetch next ${skip} rows only`;
    }
    if (req.query.search) {
      const [searchDescription, searchItem] = req.query.search.split(':');
      await searchSchema.validateAsync({ searchDescription });
      searchField = `where ${searchDescription} like '%${searchItem}%'`;
    }
    const request = new sql.Request(req.app.locals.db);
    const result = await request.query(
      `select * from [dbo].[viewStudents_Ecoles] ${searchField} order by ${sortDescription} ${sortOrder} ${pagination}`
    );
    res.send(result.recordsets[0]);
  } catch (error) {
    return errorHandler(error, res);
  }
};

const createStudent = async function (req, res) {
  try {
    await studentsSchema.validateAsync(req.body);
    const { firstName, lastName, age, ecole_id } = req.body;
    const request = new sql.Request(req.app.locals.db);
    request.input('firstName', sql.NVarChar, firstName);
    request.input('lastName', sql.NVarChar, lastName);
    request.input('age', sql.Int, age);
    request.input('ecole_id', sql.Int, ecole_id);
    const result = await request.execute('createStudent');
    if (result.rowsAffected[0] > 0) return res.send({ msg: 'Student added sucessfully' });
    return res.status(400).send();
  } catch (error) {
    return errorHandler(error, res);
  }
};

const getStudent = async (req, res) => {
  const studentId = req.params.id;
  try {
    const request = new sql.Request(req.app.locals.db);
    request.input('id', sql.Int, studentId);
    const result = await request.execute('getStudentByID');
    if (result.rowsAffected[0] === 0) return res.send({ msg: `There is no student with id = ${studentId}` });
    res.send(result.recordsets[0]);
  } catch (error) {
    return errorHandler(error, res);
  }
};

const updateStudent = async function (req, res) {
  try {
    await studentsSchema.validateAsync(req.body);
    const getStudent = await axios.get(`http://127.0.0.1:3000/students/${req.params.id}`);
    let { id, Nom: firstName, Prenom: lastName, Age: age, ecole_id } = getStudent.data[0];
    firstName = firstName.trim();
    lastName = lastName.trim();
    const request = new sql.Request(req.app.locals.db);
    ({ firstName = firstName, lastName = lastName, age = age, ecole_id = ecole_id } = req.body);
    request.input('id', sql.Int, id);
    request.input('firstName', sql.NVarChar, firstName);
    request.input('lastName', sql.NVarChar, lastName);
    request.input('age', sql.Int, age);
    request.input('ecole_id', sql.Int, ecole_id);
    const result = await request.execute('updateStudent');
    if (result.rowsAffected[0] > 0) return res.send({ msg: `Student ${firstName} updated sucessfully` });
    if (result.rowsAffected[0] === 0) return res.send({ msg: `Student n°${req.params.id} does not exists` });
    res.status(400).send();
  } catch (error) {
    return errorHandler(error, res);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const request = new sql.Request(req.app.locals.db);
    request.input('id', sql.Int, req.params.id);
    const result = await request.execute('deleteStudent');
    if (result.rowsAffected[0] > 0) return res.send({ msg: `Student n°${req.params.id} deleted sucessfully` });
    if (result.rowsAffected[0] === 0) return res.send({ msg: `Student n°${req.params.id} does not exists` });
  } catch (error) {
    return errorHandler(error, res);
  }
};
export { getStudents, createStudent, getStudent, updateStudent, deleteStudent };
