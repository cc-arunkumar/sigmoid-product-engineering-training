const express = require("express");

const app = express();

const productRoutes = require("./routes/productRoutes");
const logger  = require("./middleware/logger");

app.use(express.json());
app.use(logger);
app.use("/api", productRoutes);

app.get("/", (req,res) => {
    res.send("Welcome to Backend !!");
})

app.listen(3000, () => {
    console.log("server started !!");
    console.info("server running on http://localhost:3000/");
    console.info("products running on http://localhost:3000/products");
    console.info("users running on http://localhost:3000/users");
    console.info("orders running on http://localhost:3000/orders");
})