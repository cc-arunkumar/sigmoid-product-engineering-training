const express = require("express");
const productRoutes = require('./routes/product');

const app = express();

app.use(express.json());


app.use('/api/products', productRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Backend !!!");
});

module.exports = app;