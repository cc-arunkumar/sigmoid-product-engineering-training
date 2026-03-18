const express = require("express");
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

const app = express();

app.use(express.json());
app.use(logger);



app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Backend !!!");
});


app.use(errorHandler);

module.exports = app;