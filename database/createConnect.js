var mysql = require('mysql');
const {con} = require('./createConnection');


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

