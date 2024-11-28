var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "project7db"
});

// router.get('/', function(req, res, next) {
//     const userId = req.query.user_id;
//     console.log('userId: ', userId);
    
//     const sql = `SELECT * FROM post WHERE user_id=${userId}`;
//     con.query(sql, function (err, result) {
//         if (err) return res.status(400).send(err.message);
//         console.log("get todos");
//         res.send(result);
//     });
// })

// router.get('/', function(req, res, next) {
//     // const userId = req.query.user_id;
//     // console.log('userId: ', userId);
    
//     const sql = `SELECT * FROM post`;
//     con.query(sql, function (err, result) {
//         if (err) return res.status(400).send(err.message);
//         console.log("get posts");
//         res.send(result);
//     });
// })

router.get('/', function(req, res, next) {

    console.log('req.query._start: ', req.query._start);
    const startIndex = req.query._start;
    console.log('startIndex: ', startIndex);
    const limit = req.query._limit;
    console.log('limit: ', limit);
    
    const sql = `SELECT * FROM post ORDER BY id ASC LIMIT ${limit} OFFSET ${startIndex}`;
    console.log('sql: ', sql);
    con.query(sql, function (err, result) {
        if (err) return res.status(400).send(err.message);
        console.log("get posts");
        res.send(result);
    });
})

router.post('/', function(req, res, next) {
    const newPost = req.body;
    const sql = `INSERT INTO post (title, user_id, body) VALUES ('${newPost.title}', ${newPost.user_id}, '${newPost.body}')`;
    console.log('sql: ', sql);
    con.query(sql, function (err, result) {
        if (err) return res.status(400).send(err.message);
        console.log('result: ', result.insertId);
        console.log("post post");
        res.send(result);
    });
})

router.patch('/:id', function(req, res, next) {
    const id = req.params.id;
    const sql = `UPDATE post SET title = '${req.body.title}' WHERE id=${id}`;
    console.log('sql: ', sql);
    con.query(sql, function (err, result) {
        console.log('err: ', err);
        if (err) return res.status(400).send(err.message);
        console.log('result: ', result);
        console.log("post post");
        res.send(result);
    });
})

router.delete("/:id", function (req, res) {
    con.query(`DELETE FROM post WHERE id=${req.params.id}`,
        function (err, result) {
            if (err) {
                res.status(404).send(err.message);
            }
            res.send(result);
        }
    )
    con.query(`DELETE FROM comment WHERE post_id=${req.params.id}`,
        function (err, result) {
            if (err) {
                res.status(404).send(err.message);
            }
            res.send(result);
        }
    )
})
module.exports = router;
