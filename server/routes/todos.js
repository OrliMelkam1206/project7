var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "project7db"
});

router.get('/', function(req, res, next) {
    const userId = req.query.user_id;
    console.log('userId: ', userId);
    
    const sql = `SELECT * FROM todo WHERE user_id=${userId}`;
    con.query(sql, function (err, result) {
        if (err) return res.status(400).send(err.message);
        console.log("get todos");
        res.send(result);
    });
})

router.post('/', function(req, res, next) {
    const newTodo = req.body;
    let isCompleted = 0

    if(newTodo.completed === true){
        isCompleted = 1
    }
    const sql = `INSERT INTO todo (title, completed) VALUES ('${newTodo.title}', ${isCompleted})`;
    con.query(sql, function (err, result) {
        if (err) return res.status(400).send(err.message);
        console.log("post todo");
        res.send(result.body);
    });
})

module.exports = router;
