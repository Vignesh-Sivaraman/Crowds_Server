const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD || "",
  database: process.env.DBDATABASE,
});

// db.connect(function (error) {
//   if (error) {
//     console.log(error);
//     process.exit();
//   } else console.log("SQL Database Connected!");
// });

module.exports = db;
