const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "walletgo_db"
});

app.post("/create",(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    db.query('INSERT INTO usuarios(name,email,password) VALUES(?,?,?)',[name,email,password],(err,result)=>{
        if(err){
            console.log(err.message)
        }else{
            res.send("usuario registrado con exito");
        }
    });
})

app.listen(3001,()=>{
    console.log("server is listening on port 3001")
})