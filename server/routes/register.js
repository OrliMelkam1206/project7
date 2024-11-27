var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "project7db"
});

const isValid = (user) => {
  if (user.username.length < 2 || user.password.length < 6) return "username should contains at least 2 charscters and password should contains 6 characters";
  if (!user.email.includes('@')) return "this email is not valid";
  return true;
}
const isExist = (user) => {
  const sql = `SELECT username FROM user WHERE user_name=${user.username}`;
  con.query(sql, function (err, result) {
    if (err) return (err.message);
    console.log("get user");
    console.log('result: ', result);
    if (result.length === 0) return false;
    return true;
  });
}
/* GET users listing. */
router.post('/', function (req, res, next) {
  const newUser = req.body;
  const validation = isValid(newUser);
  if (validation !== true) return res.status(400).send(validation);
  if (isExist(newUser)) return res.status(400).send("this username is already exist");
  let userId = 0;
  const sql = `INSERT INTO user (name, user_name, email) VALUES ('${newUser.name}', '${newUser.username}', '${newUser.email}')`;
  con.query(sql, function (err, result) {
    if (err) return res.status(400).send(err.message);
    console.log("post user");
    userId = result.insertId;
    console.log(userId)
    const sql2 = `INSERT INTO password (user_id, password) VALUES (${userId}, '${newUser.password}')`;
    con.query(sql2, function (err, result) {
      if (err) return res.status(400).send(err.message);
      console.log("userid:" + userId);
      console.log("post password");
      res.send();
    });
  });

});

module.exports = router;
