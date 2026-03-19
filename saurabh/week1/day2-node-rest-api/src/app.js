// require("dotenv").config();
// const express= require("express") // express is module with which we will create our apis
// const app = express()

// const productRoutes= require("./routes/productRouter");
// const userRoutes = require("./routes/userRouter");
// const orderRoutes = require("./routes/orderRouter");
// const loggers= require("./middleware/logger");
// const errorHandler= require("./middleware/errorHandler");
// const { apiLimiter } = require("./middleware/rateLimiter");
// const passport = require("./config/passport");
// const authRoutes= require("./routes/authRouter");

//  // middleware so that our express understands the data send in the json format
//  app.use(express.json());
// app.use(loggers);

// // Initialize passport for OAuth and session support
// const session = require("express-session");
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "mysecretkey",
//     resave: false,
//     saveUninitialized: false
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // Apply auth routes first (with their own stricter rate limiter)
// app.use("/api/auth", authRoutes);

// // Apply general API limiter to all other routes
// app.use(apiLimiter);
// app.use(productRoutes);
// app.use(userRoutes);
// app.use(orderRoutes);


// app.use(errorHandler);

// // console.log("About to start server");

// app.get("/api", (req,res)=>{
//     res.send("welcome to backend");
// })

// app.listen(3000, ()=>{
//     console.log("server started")
    
// })


require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();

const productRoutes = require("./routes/productRouter");
const userRoutes = require("./routes/userRouter");
const orderRoutes = require("./routes/orderRouter");
const authRoutes = require("./routes/authRouter");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");

const passport = require("./config/passport");

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(logger);

// Session middleware for Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// ================= ROUTES =================
app.use("/api/auth", authRoutes); // Auth first (has its own rate limiter)
app.use(apiLimiter); // General rate limiter for other routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// ================= ERROR HANDLER =================
app.use(errorHandler);

// ================= SERVER =================
app.listen(3000, () => {
  console.log("Server running on port 3000");
});