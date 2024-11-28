var express = require("express");
var router = express.Router();
const { con } = require("../../database/createConnection.js");

router.post("/", function (req, res) {
    //expected body: user_name, password

    con.query(`select * from user where user_name="${req.body.username}"`, function (err, result1) {
        console.log("innnnnnn");
        if (err) res.status(500).send("error. please try again");
        if (result1.length === 0) return res.status(404).send("username or password incorrect");
        //check password
        const userId = result1[0].id;
        console.log('userId: ', userId);
        con.query(`select password from password where user_id="${userId}"`, function (err, result2) {
            if (err) return res.status(500).send("error. please try again");
            if (result2[0].password !== req.body.password) return res.status(404).send("username or password incorrect");
            res.send(JSON.stringify({
                username: result1[0].user_name,
                name: result1[0].name,
                email: result1[0].email,
                id: userId
            }));
        })
    })
})

module.exports = router;