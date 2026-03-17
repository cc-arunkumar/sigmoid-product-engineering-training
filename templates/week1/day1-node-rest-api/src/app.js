const express = require("express");
//const userRoutes = require("./routes/userRoutes");

const app = express();
const productRoutes=require("./routes/productRoutes")
const logger=require("./middleware/logger");
app.use(express.json());
app.use(logger);
app.use(productRoutes);
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})


// Register routes
//app.use("/api/users", userRoutes);

module.exports = app;