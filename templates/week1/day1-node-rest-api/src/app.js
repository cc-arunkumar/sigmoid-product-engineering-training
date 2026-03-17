const express = require("express");

const app = express();

app.use(express.json());

const productRoutes = require("./routes/productRoutes");
const logger = require("./middleware/logger"); //for logger

app.use(productRoutes);
app.use(logger);


app.listen(3000,()=>{
    console.log("Server started on port 3000");
});