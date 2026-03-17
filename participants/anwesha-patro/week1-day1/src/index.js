const express = require("express")

const app = express()

const productRoutes = require("./routes/productRoutes");

const productLogger = require("./middleware/logger");

app.use(express.json());


app.use(productLogger);

app.use(productRoutes);




app.listen(4000, () => {
    console.log("running on port 4000")
})