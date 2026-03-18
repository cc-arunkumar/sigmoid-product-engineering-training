
const express = require("express");
const app = express();
app.use(express.json());



// ! adding middlewere
const {errorHandler ,logger} = require("./middlewere/logger")

const {apiLimiter} = require("./middlewere/rateLimiter")
app.use(logger)

app.use(apiLimiter)

const productroute = require("./Routes/route")

const authroutes = require("./Routes/authRoutes") ;
app.use(productroute);

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/auth" , authroutes)
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
