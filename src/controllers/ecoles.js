import sql from 'mssql';
const createEcole = async (req, res) => {
  try {
    const request = new sql.Request(req.app.locals.db);
    const { name } = req.body;
    request.input('name', sql.NVarChar, name);
    const result = await request.execute('createEcole');
    if (result.rowsAffected[0] > 0) return res.send({ msg: 'Ecole added sucessfully' });
    res.status(400).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getEcoles = async function (req, res) {
  try {
    const request = new sql.Request(req.app.locals.db);
    const result = await request.execute('getEcoles');
    res.send(result.recordsets[0]);
  } catch (error) {
    res.status(400).send(error);
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
    res.status(400).send(error);
  }
};

export { createEcole, getEcoles, getEcole };
