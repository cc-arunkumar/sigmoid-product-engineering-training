const express=require("express")

const app=express();

const dotenv=require("dotenv");
dotenv.config();

const connectMongo =require("./config/mongo");
connectMongo();

const productRoutes=require("./routes/productRoutes");
const authRoutes=require("./routes/authRoutes");

const logger=require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const {apiLimiter}=require("./middleware/rateLimiter");

const passport=require("./config/passport");
const { connect } = require("node:http2");

app.use(express.json())
app.use(logger);
app.use(apiLimiter);

app.use(passport.initialize());

app.use(productRoutes);
app.use("/api/auth",authRoutes);

app.use(errorHandler);

app.get("/",(req,res)=>{
    res.send("API running");
});
console.log("ENV PORT:",process.env.PORT);
const PORT=process.env.PORT||3000

app.listen(3000,()=>{
    console.log("listing!!")
});
