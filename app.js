const express = require("express");
const app = express();

const productRoutes = require("./routes/productRoutes");
const logger = require("./middleware/logger");

app.use(express.json());
app.use(logger);
app.use("/", productRoutes);

app.listen(4000, () => {
    console.log(`Server running at http://localhost:4000`);
});
