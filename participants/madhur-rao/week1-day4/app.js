const express=require("express");
const app = express();

const productRoutes = require("./Routes/productRoutes");
const authRoutes = require("./Routes/authRoutes");
const logger = require("./Middleware/logger");
const errorHandler = require("./Middleware/errorHandler");
const {apiLimiter} = require("./Middleware/rateLimiter");
const passport = require("./config/passport");
const connectMongo = require("./config/mongo");
require("dotenv").config();

connectMongo();

app.get('/',(req,res)=>{
    res.send("API running");
})
console.log("ENV PORT:",process.env.PORT);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use(apiLimiter);
app.use(passport.initialize());
app.use(authRoutes);
app.use(productRoutes);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}...`);
});