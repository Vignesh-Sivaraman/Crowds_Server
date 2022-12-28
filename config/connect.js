const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD || "",
  database: process.env.DBDATABASE,
});

module.exports = db;
