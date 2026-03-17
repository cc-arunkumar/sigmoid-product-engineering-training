const express = require("express");
const port = 8080;

const app = express();

const productRoutes = require("./routes/productRoutes");

app.use(express.json()); //this is middlleware which helps use express json

app.use(productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
