const express=require("express");
const app=express();
const productRoutes = require("./routes/productRoutes");
const logger=require("./middleware/logger");
const errorHandler=require("./middleware/errorHandler");
app.use(express.json());
app.use(logger);
app.use("/",productRoutes);
app.use(errorHandler);
app.listen(3000,()=>{
    console.log("Server running on port 3000")
});
