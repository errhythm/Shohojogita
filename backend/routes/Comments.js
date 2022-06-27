const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/AuthMiddlewar');
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "events",
});

router.get("/:eventId",async(req,res)=>{
    const eventId = req.params.eventId;
    const sqlcomments = "SELECT * FROM Comments WHERE events_idevents=?";
    await db.query(sqlcomments, eventId,(err,result)=>{
        if (result.length>0){
            res.json(result);
        }
    })
});

router.post("/", validateToken, async(req,res)=>{
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    const sqlInsert2 = "INSERT INTO Comments (commentBody, username, events_idevents, users_idusers) VALUES (?,?,?,?)";
    await db.query(sqlInsert2, [comment.commentBody, username,comment.EventId,comment.UserId], (err,result)=>{
        res.json(comment);

    })
})

module.exports = router