const express = require("express");
const port = 8080;

const app = express();

const logger = require("./middleware/logger");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");

app.use(express.json()); //this is middlleware which helps use express json
app.use(logger);

app.use(apiLimiter);
app.use(productRoutes);
app.use(orderRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});