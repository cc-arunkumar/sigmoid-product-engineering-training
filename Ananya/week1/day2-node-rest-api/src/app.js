require("dotenv").config({ path: "../.env" }); // Load environment variables from root .env file

const express = require("express"); // express is module with which we will create our apis
const app = express();
const session = require("express-session");
const passport = require("./config/passport");

const productRoutes = require("./routes/productRouter");
const loggers = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const authRoute = require("./routes/authRouter");
const { apiLimiter } = require("./middleware/rateLimiter");

// Middleware for JSON parsing
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "yoursessionsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to false for development (HTTP), true for production (HTTPS)
      sameSite: "lax", // Changed from "strict" to "lax" for better compatibility
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Logger and API rate limiter
app.use(loggers);
app.use(apiLimiter);

app.use(productRoutes);
app.use("/api/auth", authRoute);

app.get("/api", (req, res) => {
  res.send("welcome to backend"); // sending the response
});

// Test route to check environment variables
app.get("/api/test", (req, res) => {
  res.json({
    message: "Server is running",
    env: {
      NODE_ENV: process.env.NODE_ENV,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "SET" : "NOT SET",
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "SET" : "NOT SET",
      JWT_SECRET: process.env.JWT_SECRET ? "SET" : "NOT SET",
      SESSION_SECRET: process.env.SESSION_SECRET ? "SET" : "NOT SET"
    }
  });
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("server started on port 3000");
});