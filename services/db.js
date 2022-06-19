const mysql = require('mysql');
require('dotenv').config()
const dbConfig = require("../configs/db.config.js");
console.log(dbConfig[process.env.DB_SELECT])
const connection = mysql.createConnection(dbConfig[process.env.DB_SELECT] || dbConfig.test);
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});


module.exports = connection