const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  
  user: "root",
  
  password: "N0password",
  database: "employees"
});

connection.connect();


connection.query = util.promisify(connection.query);

module.exports = connection;
