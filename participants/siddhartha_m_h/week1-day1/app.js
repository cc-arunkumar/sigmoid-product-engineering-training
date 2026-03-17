const express = require("express");

const app = express();
// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to Backend !!!");
});

module.exports = app;