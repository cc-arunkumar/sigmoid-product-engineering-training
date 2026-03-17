const express = require("express")
const app = express() //express is initialised and it is kept under a variable app
app.get("/api",(req,res)=>{
    res.send("Welcome to backend");
})
app.use(express.json());
const productRoutes=require("./routes/productRoutes.js");
const logger=require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");
app.use(logger);
app.use(productRoutes);
app.use(errorHandler);
app.listen(3000,()=>{
    console.log("Server started on port 3000");
});