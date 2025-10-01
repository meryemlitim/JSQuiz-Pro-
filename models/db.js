const mysql = require("mysql2");

//data base conection 
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "jsQuizPro"
});

// export the connection as a promise
module.exports = pool.promise();
