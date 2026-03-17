import express from "express";

const app = express()

app.get("/",(req,res) =>{
  res.send("Welcome to the server");
})

app.listen(3000, () => {
    console.log("SERVER ON 3000")
})