const express=require("express");

const port=3000;
const app=express();
const productRoutes=require("./routes/productRoutes")


app.use(express.json());  // Middleware to parse JSON request bodies 

app.use(productRoutes);  // Use the product routes for handling requests to /products and /product/:id


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 