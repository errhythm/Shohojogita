const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const { validateToken } = require('../middlewares/AuthMiddlewar');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "events",
});

router.get("/",async(req,res)=>{
    const sqlListEvent = "SELECT * FROM reports";
    await db.query(sqlListEvent, (err,result)=>{
        res.json(result);
    })
});

router.post("/",async(req,res)=>{
    const { data } = req.body;
    const sqlListEvent = "INSERT INTO reports (complaints,Event,username) VALUES (?,?,?)";
    await db.query(sqlListEvent,[data.complaints,data.event,data.username], (err,result)=>{
        console.log(err);
    })
})

module.exports = router