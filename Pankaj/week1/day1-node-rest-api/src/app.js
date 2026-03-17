const express = require("express");

const app = express();

const productRoutes = require("./routes/productRoutes");

const logger = require("./middleware/logger");
app.use(express.json());


app.use(logger);

app.use(productRoutes);

app.get("/api", (req, res) => {
    res.send("Welcome to the Backend !!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

