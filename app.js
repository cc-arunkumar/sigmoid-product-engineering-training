

const express = require("express");
const app = express();

app.use(express.json());

// ! adding middlewere
const {errorHandler} = require("./middlewere/logger")
const {logger} = require("./middlewere/logger")
app.use(logger)
app.use(errorHandler);


app.get("/", (req, res) => {
    res.send("Hello World");
});



const productroute = require("./Routes/route")
app.use(productroute);


app.listen(3000, () => {
    console.log("Server running on port 3000");
});