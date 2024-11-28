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
  console.log('user2: ', user);
  console.log(user.username.length)
  if (user.username.length < 2 || user.username.length > 15) {
    return "username should be longer than 2 characters and shorter than 15 character";
  }
  if (user.password.length < 2 || user.password.length > 15) {
    return "password should be longer than 2 characters and shorter than 15 character";
  }
  if (!user.email.includes('@')) return "this email is not valid";
  return true;
}
const isExist = (user) => {
  console.log('user: ', user);
  const sql = `SELECT * FROM user WHERE user_name='${user.username}'`;
  console.log('sql: ', sql);
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
  // const exist = isExist(newUser);
  // console.log('exist: ', exist);
  const sql2 = `SELECT * FROM user WHERE user_name='${newUser.username}'`;
  console.log('sql: ', sql2);
  con.query(sql2, function (err, result) {
    if (err) return (err.message);
    console.log("get user");
    console.log('result: ', result);
    if (result.length !== 0) return res.status(400).send("this username is already exist");
    res.send()
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
        res.send(JSON.stringify({
          username: newUser.username,
          name: newUser.name,
          email: newUser.email,
          id: userId
        }));
      });
    });
    let userId = 0;

  });
})

module.exports = router;
