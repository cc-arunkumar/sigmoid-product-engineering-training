// require("dotenv").config();
// const connectDB = require("./config/mongo");
// connectDB();

// const express = require("express");


// const app = express();

// const productRoutes = require("./routes/productRoutes");

// const logger = require("./middleware/logger");
// const errorHandler = require("./middleware/errorHandler");
// const authRoutes = require("./routes/authRoutes");
// const { apiLimiter } = require("./middleware/rateLimiter");
// const passport = require("./config/passport");

// app.use(express.json());
// app.use(logger);
// app.use(apiLimiter);
// app.use(passport.initialize());


// app.use("/api", productRoutes);
// app.use("/api/auth", authRoutes);

// app.use(errorHandler);

// app.listen(3000, () => {
//     console.log("server started !!");
//     console.info("server running on http://localhost:3000/api");
//     console.info("products running on http://localhost:3000/api/products");
//     console.info("auth (login) running on http://localhost:3000/api/auth/login");
//     console.info("auth (google) running on http://localhost:3000/api/auth/google");
// })
const express = require("express"); 

require("dotenv").config(); 

  

// DB 

const connectMongo = require("./config/mongo"); 

const { connectSQL } = require("./config/sql"); 

  

// Routes 

const productRoutes = require("./routes/productRoutes"); 

const authRoutes = require("./routes/authRoutes"); 

  

// Middleware 

const errorHandler = require("./middleware/authMiddleware"); 

const logger = require("./middleware/logger"); 

  

const app = express(); 

  

// Connect MongoDB 

connectMongo(); 

  

// After Mongo connection 

connectSQL(); 

  

// Middlewares 

app.use(express.json()); 

app.use(logger); 

  

// Routes 

app.get("/", (req, res) => { 

    res.send("API Running"); 

}); 

  

app.use("/api/products", productRoutes); 

app.use("/api/auth", authRoutes); 

  

// Error handler (must be last) 

app.use(errorHandler); 

  

// Start server 

const PORT = process.env.PORT || 3000; 

  

app.listen(PORT, () => { 

    console.log(`Server running on port ${PORT}`); 

}); 

  