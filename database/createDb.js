var mysql = require('mysql');
const {con} = require('./createConnection');


con.query("CREATE DATABASE project7db", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});