require("dotenv").config()
const express = require("express");

const app = express();


const productRoutes = require("./routes/productRoutes")
const authRoutes = require("./routes/authRoutes")

const logger = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")
const { apiLimiter } = require("./middleware/rateLimiter")
const passport = require("./config/passport");
const connectDB = require("./config/mongo");

connectDB();

app.use(express.json());
app.use(logger);
app.use(apiLimiter);

app.use(passport.initialize());


app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler)

app.get('/', (req, res) => { 
  res.send("API Running"); 
}); 

console.log("ENV PORT:", process.env.PORT); 
const PORT = process.env.PORT || 3000

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`); 
});