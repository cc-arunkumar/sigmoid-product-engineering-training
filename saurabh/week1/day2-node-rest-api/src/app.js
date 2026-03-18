const express= require("express") // express is module with which we will create our apis
const app = express()

const productRoutes= require("./routes/productRouter");
const userRoutes = require("./routes/userRouter");
const orderRoutes = require("./routes/orderRouter");
const loggers= require("./middleware/logger");
const errorHandler= require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");
const authRoutes= require("./routes/authRouter");

 // middleware so that our express understands the data send in the json format
 app.use(express.json());
app.use(loggers);
app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);
app.use(apiLimiter);
app.use("/api/auth", authRoutes);


app.use(errorHandler);

// console.log("About to start server");

app.get("/api", (req,res)=>{
    res.send("welcome to backend");
})

app.listen(3000, ()=>{
    console.log("server started")
    
})