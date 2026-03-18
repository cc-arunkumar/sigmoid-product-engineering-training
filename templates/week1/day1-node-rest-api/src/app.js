const express=require("express")
const app=express()
const PORT=3000
const productRoutes=require("./routes/productRoutes");
const authRoutes=require("./routes/authRoutes");
const logger=require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
app.use(logger);
app.use(express.json());

app.use("/api/products",productRoutes);
app.use("/api/auth",authRoutes);




app.use(errorHandler)
app.listen(PORT,()=>{
    console.log("server running on Port 3000  ")
});