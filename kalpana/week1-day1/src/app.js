// // const express = require("express");
// // const app = express();
// // require("dotenv").config();
// // const connectDB = require("./config/mongo");
// // const { connectSQL } = require("./config/sql");

// // const productRoutes = require("./routes/productRoutes");
// // const authRoutes = require("./routes/authroutes");

// // const productLogger = require("./middleware/logger");
// // const errorHandler = require("./middleware/errorHandler");

// // const { apiLimiter } = require("./middleware/rateLimiter");
// // // const passport = require("./config/passport");

// // const PORT = process.env.PORT || 3000;

// // // Connect to MongoDB and then start server
// // connectDB().then(() => {
// //     console.log("MongoDB connected");

// //     app.use(express.json());
// //     app.use(productLogger);
// //     // app.use(passport.initialize());

// //     app.get("/", (req, res) => res.send("API Running"));

// //     app.use("/api/products", apiLimiter, productRoutes);
// //     app.use("/api/auth", authRoutes);

// //     app.use(errorHandler);

// //     app.listen(PORT, () => {
// //         console.log(`Server running on port ${PORT}`);
// //     });
// // }).catch(err => {
// //     console.error("Failed to connect to MongoDB:", err);
// // });



// const express = require("express");

// require("dotenv").config();


// // DB

// const connectMongo = require("./config/mongo");

// const { connectSQL } = require("./config/sql");


// // Routes

// const productRoutes = require("./routes/productRoutes");

// const authRoutes = require("./routes/authRoutes");


// // Middleware

// const errorHandler = require("./middleware/authMiddleware");

// const logger = require("./middleware/logger");


// const app = express();


// // Connect MongoDB

// connectMongo();


// // After Mongo connection

// connectSQL();


// // Middlewares

// app.use(express.json());

// app.use(logger);


// // Routes

// app.get("/", (req, res) => {

//     res.send("API Running");

// });


// app.use("/api/products", productRoutes);

// app.use("/api/auth", authRoutes);


// // Error handler (must be last)

// app.use(errorHandler);


// // Start server

// const PORT = process.env.PORT || 3000;


// app.listen(PORT, () => {

//     console.log(`Server running on port ${PORT}`);

// });


const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./config/mongo");
const { connectSQL, sequelize } = require("./config/sql");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const productLogger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");
// const passport = require("./config/passport");

const PORT = process.env.PORT || 3000;

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(productLogger);
// app.use(passport.initialize());

app.get("/", (req, res) => res.send("API Running"));

// ---------------- ROUTES ----------------
app.use("/api/products", apiLimiter, productRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

// ---------------- CONNECT BOTH DBs ----------------
(async () => {
    // MongoDB
    if (process.env.MONGO_URI) {
        try {
            await connectDB();
            console.log("MongoDB connected ✅");
        } catch (err) {
            console.error("MongoDB connection failed:", err.message);
        }
    }

    // MySQL / SQL
    try {
        await connectSQL();
        console.log("MySQL connected ✅");

        // Sync tables
        await sequelize.sync({ alter: true });
        console.log("SQL tables synced ✅");
    } catch (err) {
        console.error("MySQL connection failed:", err.message);
    }

    // ---------------- START SERVER ----------------
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})();