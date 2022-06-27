const express = require('express');
const { validateToken } = require('../middlewares/AuthMiddlewar');
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "events",
});

router.post("/",validateToken, async(req,res)=>{
    const { EventId,data } = req.body;
    const UserId = req.user.id;

    const sqlInsert = "INSERT INTO Donations (username,message,amount,events_idevents, users_idusers) VALUES (?,?,?,?,?)";
    await db.query(sqlInsert, [data.username,data.message,data.amount,EventId, UserId], (err,result)=>{
        console.log(err);
        res.json("Success");
    })

})

router.get("/:id",async(req,res)=>{
    const id = req.params.id;
    const sqlFindId = "SELECT * FROM Donations WHERE events_idevents=?";
    await db.query(sqlFindId, id, (err, result)=>{
        if (result.length>0){
            console.log(result);
            res.json(result);
        }
    })
});


module.exports = router