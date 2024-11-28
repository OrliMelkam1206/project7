const express = require("express");
const router = express.Router();
const { con } = require("../../database/createConnection.js");

router.post("/", function (req, res) {
    //expected body: post_id, title, userId, body
    con.query(`insert into comment (post_id, title, user_id, body) values (${req.body.post_id}, "${req.body.title}", ${req.body.user_id}, "${req.body.body}")`,
        function (err, result) {
            if (err) {
                res.status(400).send(err.message);
            }
            res.send(result);
        }
    )
});

router.get("/:post_id", function (req, res) {
    con.query(`select * from comment where post_id= ${req.params.post_id}`,
        function (err, result) {
            if (err) {
                res.status(404).send(err.message);
            }
            res.send(result);
        }
    )
})

router.delete("/:id", function (req, res) {
    con.query(`DELETE FROM comment WHERE id=${req.params.id}`,
        function (err, result) {
            if (err) {
                res.status(404).send(err.message);
            }
            res.send(result);
        }
    )
})

module.exports = router;