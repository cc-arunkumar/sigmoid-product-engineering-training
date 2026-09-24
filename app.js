const express = require("express")

const dotenv = require("dotenv");
dotenv.config();

//DB
const connectMongo = require("./config/mongo");
const { connectSQL } = require("./config/sql");

//Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

//Middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");

const app = express();

const { sequelize } = require("./config/sql");
sequelize.sync({ alter: true })
    .then(() => { console.log("SQL db synced") })
    .catch ((err) => { console.log("SQL db synce error:", err); });

//Connect DB
connectMongo();
connectSQL();


const passport = require("./config/passport");
const { connect } = require("node:http2");

app.use(express.json())
app.use(logger);
app.use(apiLimiter);

app.use(passport.initialize());

app.get("/", (req, res) => {
    res.send("API running");
});

app.use(productRoutes);
app.use("/api/auth", authRoutes);

//Error handler
app.use(errorHandler);

console.log("ENV PORT:", process.env.PORT);
const PORT = process.env.PORT || 3000

app.listen(3000, () => {
    console.log(`Server running on port ${PORT}`);
});
