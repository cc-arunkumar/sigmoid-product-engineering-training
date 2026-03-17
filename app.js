const express = require("express");

const app = express();
const PORT = 3000

const productRoutes = require("./routes/productRoutes");

const logger = require("./middleware/logger")

app.use(express.json()); // this is a middleware that converts JSON format data into javascript object (node can read the javascript object not JSON)
app.use(logger)
app.use(productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})