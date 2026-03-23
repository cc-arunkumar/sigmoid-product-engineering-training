const express=require("express");

const app= express();
require("dotenv").config();
// console.log(process.env.GOOGLE_CLIENT_ID);


const connectdb=require("./src/config/mongo");
connectdb();


const productRoutes=require("./src/Routes/productRoutes")
const logger=require("./src/middleware/logger")
const errorhandler=require("./src/middleware/errorHandler")

const authroutes=require("./src/Routes/authRoutes");
const { apiLimiter } = require("./src/middleware/rateLimiter");

const passport = require("./src/config/passport");

// const { sequelize } = require("./src/config/sqlconnection");

const connectSQL = require("./src/config/sqlconnection").connectSQL;  

connectSQL(); // Connect to SQL database



app.use(express.json()); //enable middleware to express read json
app.use(logger);
app.use(apiLimiter);

app.use(passport.initialize());

app.use("/api",productRoutes);

app.use("/api/auth",authroutes);


app.use(errorhandler);




app.listen(3000, ()=>{
    console.log("server is running...")
});