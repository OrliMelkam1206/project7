const express = require("express");
const router = express.Router();
const { con } = require("../../database/createConnection.js");

router.post("/", function (req, res) {
    //expected body: user_name, password

    //check if username not taken
    //add it

    con.query(`select * from user where user_name="${req.body.user_name}"`, function (err, result1) {
        if (err) res.status(500).send("error. please try again");
        if (result1.length === 0) return res.status(404).send("username or password incorrect");
        // return res.send(result1);
        //check password
    })
})

module.exports = router;