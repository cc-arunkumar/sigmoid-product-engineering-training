const express = require("express");

const app = express();

app.use(express.json());

// Register routes
app.get("/", (req, res) => {
    res.send("welcome to backend development");
});

module.exports = app;