const express=require("express");

const app= express();


const logger=require("./middleware/logger")

app.use(express.json()); //enable middleware to express read json


app.use(logger);

app.listen(3000, ()=>{
    console.log("server is running...")
});