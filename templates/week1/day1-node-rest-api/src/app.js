const express=require("express")

const app=express()
const PORT=3000

app.use(express.json());
const productRoutes=require("./routes/productRoutes");
app.use(productRoutes);
app.listen(PORT,()=>{
    console.log("server running on Port 3000")
});