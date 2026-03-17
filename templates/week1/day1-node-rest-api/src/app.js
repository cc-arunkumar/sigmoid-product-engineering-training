const express = require("express");

const app = express();
const PORT = 3000;
const productRoutes = require("./routes/productRoutes");
const logger=require("./middleware/logger")
const errorHandler=require("./middleware/errorHandler")
app.use(express.json());
app.use(productRoutes);
app.use(logger)
app.use(errorHandler);
app.listen(PORT, () => {
  return console.log(`Server running on port ${PORT}`);
});
