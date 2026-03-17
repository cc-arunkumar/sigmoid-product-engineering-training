const express=require("express");

const app= express();

const productRoutes=require("./Routes/productRoutes")

app.use(express.json()); //enable middleware to express read json

app.use(productRoutes);

app.listen(3000, ()=>{
    console.log("server is running...")
});