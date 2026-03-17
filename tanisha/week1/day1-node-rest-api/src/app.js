const express = require("express");
const app=express();
const productRoutes =require("./routes/productRoutes");
app.use(express.json());
app.use(productRoutes);
app.listen(3000,()=>{
    console.log("server running on port 3000");
});