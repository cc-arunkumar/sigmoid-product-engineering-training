const express=require("express");
const app = express();

const productRoutes = require("./Routes/productRoutes");
const authRoutes = require("./Routes/authRoutes");
const logger = require("./Middleware/logger");
const errorHandler = require("./Middleware/errorHandler");
const {apiLimiter} = require("./Middleware/rateLimiter");
const passport = require("./config/passport");

app.use(express.json());
app.use(logger);
app.use(apiLimiter);
app.use(passport.initialize());
app.use(authRoutes);
app.use(productRoutes);
app.use(errorHandler);

app.listen(3000,()=>{
    console.log("Server started...");
});