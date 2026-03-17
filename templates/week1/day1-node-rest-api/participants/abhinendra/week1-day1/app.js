const express= require("express")

const app= express();

const productRoutes= require("./src/routes/productRoutes");

app.use(express.json());

app.use("/api",productRoutes);

const logger= require("./middleware/logger");

app.use(logger);

app.use(productRoutes);

app.listen(3000,()=>{
    console.log("Server running on 3000")
})