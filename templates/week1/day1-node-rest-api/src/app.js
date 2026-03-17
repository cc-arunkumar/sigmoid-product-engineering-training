const express=require("express")
const app=express()
const PORT=3000
const productRoutes=require("./routes/productRoutes");
const logger=require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
app.use(logger);
app.use(express.json());

app.use(productRoutes);




app.use(errorHandler)
app.listen(PORT,()=>{
    console.log("server running on Port 3000  ")
});