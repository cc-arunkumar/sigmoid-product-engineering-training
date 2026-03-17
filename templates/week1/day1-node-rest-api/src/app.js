const express = require("express");

const app = express();
const PORT = 3000;
const productRoutes = require("./routes/productRoutes");
app.use(express.json());
app.use(productRoutes);
app.listen(PORT, () => {
  return console.log(`Server running on port ${PORT}`);
});
