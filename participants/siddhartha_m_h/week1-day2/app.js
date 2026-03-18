const express = require("express");
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const authRoutes = require('./routes/authRoutes')
const {apiLimiter} = require('./middleware/rateLimiter')
const app = express();

app.use(express.json());
app.use(logger);
app.use(apiLimiter);
app.get("/", (req, res) => {
  res.send("Welcome to Backen!!!");
  console.log("Root endpoint hit");
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);




app.use(errorHandler);

module.exports = app;