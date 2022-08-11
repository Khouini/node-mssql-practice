const config = {
  user: 'system',
  password: 'tiger',
  database: 'Trunks',
  server: 'DESKTOP-S01MI4I\\SQLEXPRESS',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustServerCertificate: true,
  },
};

export default config;
