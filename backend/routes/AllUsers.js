const express = require('express');
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "events",
});

router.get("/", async(req,res)=>{
    const sqlInsert2 = "SELECT username from users where username!='admin'"
    await db.query(sqlInsert2,(err,result)=>{
        console.log(result)
        res.json(result);

    })
})

module.exports = router
