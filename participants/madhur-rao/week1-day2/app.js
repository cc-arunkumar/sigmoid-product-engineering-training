const express=require("express");
const app = express();

const productRoutes = require("./Routes/productRoutes");
const logger = require("./Middleware/logger");

app.use(express.json());
app.use(logger);
app.use(productRoutes);


app.listen(3000,()=>{
    console.log("Server started...");
});