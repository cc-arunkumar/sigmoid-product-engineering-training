const express = require("express");
const port = 8080;

const app = express();

const logger = require("./middleware/logger");
const productRoutes = require("./routes/productRoutes");
const authRoute = require("./routes/authRoutes");
const validate = require("./middleware/validate");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json()); //this is middlleware which helps use express json
// app.use(logger);

app.use(productRoutes);
app.use(authRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
