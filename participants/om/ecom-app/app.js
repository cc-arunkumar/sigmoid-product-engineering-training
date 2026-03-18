const express = require("express");
const port = 8000;

const app = express();

const logger = require("./middleware/logger");
const productRoutes = require("./routes/productRoutes");
const validate = require("./middleware/validateProduct");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");

app.use(express.json()); //this is middleware which helps use express json
app.use(logger);

app.use(productRoutes);
// app.use(validate);
app.use(authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});