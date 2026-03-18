const express=require("express");

const port=3000;
const app=express();

app.get("/",(req,res)=>{
    res.send("Welcome to the Backend API");
});

app.use(express.json());  // Middleware to parse JSON request bodies and make the data available in req.body for further processing in route handlers

const productRoutes=require("./routes/productRoutes") // Import the product routes to handle product-related API endpoints

const orderRoutes=require("./routes/orderRoutes"); // Import the order routes to handle order-related API endpoints

const userRoutes=require("./routes/userRoutes"); // Import the user routes to handle user-related API endpoints

const logger=require("./middleware/logger"); // Import the logger middleware to log incoming requests and their details (method, URL, timestamp)

const errorHandler = require("./middleware/errorHandler");  // Import the error handling middleware to catch and handle errors that occur in the application, ensuring consistent error responses to clients

app.use(productRoutes);  // Use the product routes for handling requests to /products and /product/:id

app.use(orderRoutes);  // Use the order routes for handling requests to /orders and /order/:id

app.use(userRoutes);  // Use the user routes for handling requests to /users and /user/:id

app.use(logger);  // Use the logger middleware to log incoming requests

app.use(errorHandler);  // Use the error handling middleware to catch and handle errors in the application

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 