const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req,res) => {
    console.log("Welcome to backend !!");
    res.send("welcome to backend");
})

app.listen(3000,()=>{
    console.log("Server running on 3000")
})