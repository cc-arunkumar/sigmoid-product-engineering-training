const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.get("/",(req,res) =>{
  res.send("Welcome to the server");
})

module.exports = app;