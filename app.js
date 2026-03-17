const express=require("express");

const port=3000;
const app=express();

app.get("/",(req,res)=>{
    res.send("Welcome to the Product API");
});

const productRoutes=require("./routes/productRoutes")
const logger=require("./middleware/logger")

app.use(express.json());  // Middleware to parse JSON request bodies 

app.use(productRoutes);  // Use the product routes for handling requests to /products and /product/:id

app.use(logger);  // Use the logger middleware to log incoming requests

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 