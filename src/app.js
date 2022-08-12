import express from 'express';
const app = express();
const port = 3000;
import sql from 'mssql';
import router from './routes/index.js';
import config from './db/dbconfig.js';
const appPool = new sql.ConnectionPool(config);
app.use(express.json());
app.use(router);
const start = async () => {
  try {
    app.locals.db = await appPool.connect();
    console.log('MS SQL Server connected.');
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
