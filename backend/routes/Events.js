const express = require('express');
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "events",
});

router.get("/",async(req,res)=>{
    // const listOfEvents = await Events.findAll({include: [Donations]});
    const sqlListEvent = "SELECT * FROM Events";
    await db.query(sqlListEvent, (err,result)=>{
        if (result.length>0){
            res.json(result);
        }
    })
});

router.get("/byId/:id",async(req,res)=>{
    const id = req.params.id;
    const sqlFindId = "SELECT * FROM Events WHERE idevents=?";
    await db.query(sqlFindId, id, (err, result)=>{
        if (result.length>0){
            res.json(result);
        }
    })
});

router.post("/",async(req,res)=>{
    const {title, description, goal}= req.body

    const sqlInsert = "INSERT INTO events (title, description, goal) VALUES (?,?,?)";
    await db.query(sqlInsert, [title,description,goal], (err,result)=>{
        res.json("Success");
        
    })

    // await Events.create(event);
    // res.json(event);
});

router.post("/delete",async(req,res)=>{
    const {id}= req.body
    const sqlInsert2 = "SET FOREIGN_KEY_CHECKS = 0"
    db.query(sqlInsert2,(err,result)=>{
        console.log(err);
    })
    const sqlInsert =  "DELETE FROM events WHERE idevents=?";
    await db.query(sqlInsert, [id], (err,result)=>{
        console.log(err);
        res.json("Success");
        
    })

    // await Events.create(event);
    // res.json(event);
});


module.exports = router