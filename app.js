const express = require("express");
const port = 8080;

const app = express();

const logger = require("./middleware/logger");
const productRoutes = require("./routes/productRoutes");
const validate = require("./middleware/validate");

app.use(express.json()); //this is middlleware which helps use express json
// app.use(logger);
// app.use(validate);

app.use(productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
