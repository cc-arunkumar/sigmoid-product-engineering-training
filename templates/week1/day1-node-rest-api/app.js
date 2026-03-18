const express = require("express");
const port = 8080;

const app = express();

const logger = require("./middleware/logger");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json()); //this is middlleware which helps use express json
app.use(logger);

app.use(productRoutes);
console.log("productRoutes:", typeof productRoutes);
app.use(orderRoutes);
console.log("orderRoutes:", typeof orderRoutes);
app.use(userRoutes);
console.log("userRoutes:", typeof userRoutes);
app.use(errorHandler);
console.log("errorHandler:", typeof errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});