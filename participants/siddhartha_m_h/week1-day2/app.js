const express = require("express");
const productRoutes = require('./routes/product');
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

const app = express();

app.use(express.json());
app.use(logger);



app.use('/api/products', productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Backend !!!");
});


app.use(errorHandler);

module.exports = app;