const express = require("express");
require("dotenv").config();
const connectDB = require("./config/mongo");


const app = express()

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoute");

const logger = require("./middlewares/logger");
const error = require("./middlewares/errorHandler")
const {apiLimiter} = require("./middlewares/rateLimiter")
const passport = require("./config/passport");


app.use(apiLimiter);
app.use(passport.initialize());

app.use(express.json());



app.use(logger);
connectDB(); 

 

app.get('/', (req, res) => { 

    res.send("API Running"); 

}); 

console.log("ENV PORT:", process.env.PORT); 

const PORT = process.env.PORT || 3000 

 

app.listen(PORT, () => { 

    console.log(`Server running on port ${PORT}`); 

}); 

app.use("/api/products",productRoutes);
app.use("/api/auth",authRoutes);

app.use(error);



// app.listen(3000,()=>{
//     console.log("Server is running on port 3000");
// })