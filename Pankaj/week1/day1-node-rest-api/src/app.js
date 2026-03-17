const express = require("express");

const app = express();

const productRoutes = require("./routes/productRoutes");
app.use(express.json());

app.use("/api", productRoutes);

const logger = require("./middleware/logger");
app.use(logger);

app.use("/", (req, res) => {
    res.send("Welcome to the Backend !!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

