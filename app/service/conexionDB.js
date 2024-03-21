// database.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Conexión a la base de datos establecida correctamente');
});

pool.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err);
});
module.exports = {pool};
