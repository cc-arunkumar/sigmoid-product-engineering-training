require("dotenv").config();
const express= require("express")
const app = express()

const productRoutes= require("./routes/productRouter");
const userRoutes = require("./routes/userRouter");
const orderRoutes = require("./routes/orderRouter");
const logger= require("./middleware/logger");
const errorHandler= require("./middleware/errorHandler");
const {apiLimiter} = require("./middleware/rateLimiter");
const authRoutes= require("./routes/authRouter");
const passport = require("./config/passport");

 // middleware so that our express understands the data send in the json format
app.use(express.json());
app.use(logger);
app.use(passport.initialize());
app.use("/api/auth", authRoutes);
app.use(apiLimiter);
app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);
app.use(errorHandler);

// console.log("About to start server");
app.get("/api", (req,res)=>{
    res.send("welcome to backend");
})

app.listen(3000, ()=>{
    console.log("server started")
    
})