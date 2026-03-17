const express = require("express") //express module

const app = express()//initialization of library , app const is storing the express library

app.get("/",(req,res)=>{
    res.send("Welcome backend"); //pass req,res (http objects) , return be the message to the UI in body
}) //default API we are trying to hit , path to api endpoint
app.listen(3000,()=>{ //from client to connect to the server use port
    console.log("server started"); //launch the server using node index.js hit enter calls comes here
})