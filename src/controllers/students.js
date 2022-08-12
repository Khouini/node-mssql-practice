import sql from 'mssql';
import axios from 'axios';
const getStudents = async function (req, res) {
  try {
    const request = new sql.Request(req.app.locals.db);
    const result = await request.execute('getStudentsEcoles');
    res.send(result.recordsets[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createStudent = async function (req, res) {
  try {
    const request = new sql.Request(req.app.locals.db);
    const { firstName, lastName, age, ecole_id } = req.body;
    request.input('firstName', sql.NVarChar, firstName);
    request.input('lastName', sql.NVarChar, lastName);
    request.input('age', sql.Int, age);
    request.input('ecole_id', sql.Int, ecole_id);
    const result = await request.execute('createStudent');
    if (result.rowsAffected[0] > 0) return res.send({ msg: 'Student added sucessfully' });
    res.status(400).send();
  } catch (error) {
    res.status(400).send(error);
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
    res.status(400).send(error);
  }
};

const updateStudent = async function (req, res) {
  try {
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
    res.status(400).send(error);
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
    res.status(400).send(error);
  }
};
export { getStudents, createStudent, getStudent, updateStudent, deleteStudent };
