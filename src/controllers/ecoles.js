import sql from 'mssql';
import { ecoleSchema } from '../validations/validate.js';
import errorHandler from '../errors/errors.js';
const createEcole = async (req, res) => {
  try {
    await ecoleSchema.validateAsync(req.body);
    const request = new sql.Request(req.app.locals.db);
    const { name } = req.body;
    request.input('name', sql.NVarChar, name);
    const result = await request.execute('createEcole');
    if (result.rowsAffected[0] > 0) return res.send({ msg: 'Ecole added sucessfully' });
    res.status(400).send(result);
  } catch (error) {
    return errorHandler(error, res);
  }
};
const getEcoles = async function (req, res) {
  try {
    const request = new sql.Request(req.app.locals.db);
    const result = await request.execute('getEcoles');
    res.send(result.recordsets[0]);
  } catch (error) {
    return errorHandler(error, res);
  }
};

const getEcole = async (req, res) => {
  const ecoleId = req.params.id;
  try {
    const request = new sql.Request(req.app.locals.db);
    request.input('id', sql.Int, ecoleId);
    const result = await request.execute('getEcoleByID');
    if (result.rowsAffected[0] === 0) return res.send({ msg: `There is no Ecole with id = ${ecoleId}` });
    res.send(result.recordsets[0]);
  } catch (error) {
    return errorHandler(error, res);
  }
};

const updateEcole = async (req, res) => {
  try {
    await ecoleSchema.validateAsync(req.body);
    const request = new sql.Request(req.app.locals.db);
    request.input('id', sql.Int, req.params.id);
    request.input('name', sql.NVarChar, req.body.name);
    const result = await request.execute('updateEcole');
    if (result.rowsAffected[0] > 0) return res.send({ msg: `Ecole n°${req.params.id} was updated sucessfully` });
    if (result.rowsAffected[0] === 0) return res.send({ msg: `Ecole n°${req.params.id} does not exists` });
    res.status(400).send();
  } catch (error) {
    return errorHandler(error, res);
  }
};
const deleteEcole = async (req, res) => {
  try {
    const request = new sql.Request(req.app.locals.db);
    request.input('id', sql.Int, req.params.id);
    const result = await request.execute('deleteEcole');
    if (result.rowsAffected[0] > 0) return res.send({ msg: `Ecole n°${req.params.id} was deleted sucessfully` });
    if (result.rowsAffected[0] === 0) return res.send({ msg: `Ecole n°${req.params.id} does not exists` });
    res.status(400).send();
  } catch (error) {
    return errorHandler(error, res);
  }
};

export { createEcole, getEcoles, getEcole, updateEcole, deleteEcole };
