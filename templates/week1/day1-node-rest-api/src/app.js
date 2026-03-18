const express = require("express")

const app = express()

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use(logger);
app.use(errorHandler);

app.use(productRoutes);
app.use(authRoutes);

app.listen(3000, () => {
    console.log("Listening on port 3000")
})