const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { validateToken } = require("../middlewares/AuthMiddlewar");
const { ErrorMessage } = require('formik');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "events",
});

router.post("/",async(req,res)=>{
    const { username , password } = req.body
    const sqlInsert = "INSERT INTO users (username,password) VALUES (?,?)";
    await db.query(sqlInsert,[username,password],(err,result)=>{
        if (result){
            res.json("Success");
        }
    })
});

router.post("/login",async(req,res) =>{
    const { username, password } = req.body;

    const sqlInsert = "SELECT * from users where username=? and password=?";

    
    await db.query(sqlInsert,[username,password],(err,result)=>{
        if (result.length>0){
            const accessToken = sign(
                { username: result[0].username, id: result[0].idusers },
                "hello" 
                );
                
            res.json({token: accessToken, username: result[0].username, id: result[0].idusers});
            console.log(result[0].username,result[0].idusers);
        }
        else{ 
            res.json({error: "User Doesnt Exist"})
        }
    })
});

router.get('/auth',validateToken,(req,res)=>{
    res.json(req.user);
})

router.post('/getProfile',validateToken,(req,res)=>{
    const { id } = req.body
    const sqlInsert = "SELECT * from users where idusers = ?";
    db.query(sqlInsert,[id],(err,result)=>{
        res.json(result);
    })
})

router.post('/editProfile',validateToken,(req,res)=>{
    const { username, password } = req.body;
    const user = req.user.username;
    console.log(user);
    const sqlInsert = "UPDATE users SET username = ?, password = ? WHERE username = ?";
    db.query(sqlInsert,[username,password,user],(err,result)=>{
        console.log(err);
    })
})
module.exports = router