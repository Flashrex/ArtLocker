const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'artlocker',
  password: '1234',
  database: 'artlocker',
});

connection.connect();

module.exports = { connection }