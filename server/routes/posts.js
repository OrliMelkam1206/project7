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
    
    const sql = `SELECT * FROM post WHERE user_id=${userId}`;
    con.query(sql, function (err, result) {
        if (err) return res.status(400).send(err.message);
        console.log("get todos");
        res.send(result);
    });
})

router.post('/', function(req, res, next) {
    const newPost = req.body;
    const sql = `INSERT INTO post (title, user_id, body) VALUES ('${newPost.title}', ${newPost.userId}, '${newPost.body}')`;
    con.query(sql, function (err, result) {
        if (err) return res.status(400).send(err.message);
        console.log('result: ', result.insertId);
        console.log("post post");
        res.send(result);
    });
})

module.exports = router;
