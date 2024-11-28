var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "project7db"
});


/* GET users listing. */
router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    const sql = `SELECT * FROM user WHERE id=${id}`;
    con.query(sql, function (err, result) {
        if (err) return res.status(400).send(err.message);
        console.log("get users");
        res.send(result);
    });
});

module.exports = router;
