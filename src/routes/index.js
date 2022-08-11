import express from 'express';
let router = express.Router();
import sql from 'mssql';
router.get('/view1', async function (req, res) {
  try {
    const request = new sql.Request(req.app.locals.db);
    const result = await request.execute('view1');
    res.send(result.recordsets[0]);
  } catch (error) {
    res.send(error);
  }
});

export default router;
