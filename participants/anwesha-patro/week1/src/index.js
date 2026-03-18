const express = require("express")

const app = express()

const productRoutes = require("./routes/productRoutes");

const productLogger = require("./middleware/logger");

const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authroutes");

const { apiLimiter } = require("./middleware/rateLimiter");

app.use(express.json());


app.use(productLogger);


app.use("/api/products", apiLimiter, productRoutes);

app.use("/api/auth", authRoutes)

app.use(errorHandler);




app.listen(4000, () => {
    console.log("running on port 4000")
})