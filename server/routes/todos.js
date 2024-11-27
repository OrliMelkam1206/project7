var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "schooldb"
});

router.get('?user_id=:userId', function(req, res, next) {
    const userId = req.params.userId;
    const sql = `SELECT * FROM todo WHERE user_id=${userId}`;
    con.query(sql, function (err, result) {
        if (err) return res.status(404).send(err);
        console.log("get todos");
        res.send(result);
    });
})

router
