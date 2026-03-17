const express = require("express")

const app = express()

const productRoutes = require("./routes/productRoutes");


app.use(express.json());

app.use(productRoutes);


app.listen(4000, () => {
    console.log("running on port 4000")
})