require("dotenv").config();
const express=require("express");
const app=express();

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' https://accounts.google.com"
  );
  next();
});

const productRoutes = require("./routes/productRoutes");
const authRoutes=require("./routes/authRoutes");
const logger=require("./middleware/logger");
const errorHandler=require("./middleware/errorHandler");
const {apiLimiter}=require("./middleware/rateLimiter");
const passport = require("./config/passport");

app.use(express.json());
app.use(logger);
//Apply rate limiting globally
app.use(apiLimiter);
app.use(passport.initialize());
app.use("/api/product",productRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.listen(3000,()=>{
    console.log("Server running on port 3000")
});
