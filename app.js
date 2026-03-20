
const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const connect = require("./config/connect")
connect();
const { connectSQL } = require("./config/sql");
connectSQL();
const { sequelize } = require("./config/sql");
sequelize.sync({ alter: true });






// ! adding middlewere
const {apiLimiter} = require("./middlewere/rateLimiter")

const {errorHandler ,logger} = require("./middlewere/logger")
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