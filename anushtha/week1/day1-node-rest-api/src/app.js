const express = require("express")
const app = express() //express is initialised and it is kept under a variable app
app.use(express.json());
const productRoutes=require("./routes/productRoutes");
app.use(productRoutes);
app.listen(3000,()=>{
    console.log("Server started on port 3000");
});