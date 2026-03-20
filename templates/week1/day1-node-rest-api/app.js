require("dotenv").config();

const express = require("express");
const port = 8080;

const app = express();

const logger = require("./middleware/logger");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");
const passport = require("./config/passport");  
const connectMongo = require("./config/mongo");
const { connectSQL } = require("./config/sql");

connectMongo();
connectSQL();

app.use(express.json()); //req hit the app
app.use(logger);
app.use(apiLimiter);
app.use(passport.initialize());

app.use(productRoutes);
app.use(authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
