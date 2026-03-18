const express= require("express")

const app= express();

const logger= require("./src/middleware/logger");

const productRoutes= require("./src/routes/productRoutes");

const errorHandler= require("./src/middleware/errorHandler");

app.use(express.json());

app.use(logger);

app.use("/api",productRoutes);

app.use(errorHandler);

app.listen(3000,()=>{
    console.log("Server running on 3000")
})