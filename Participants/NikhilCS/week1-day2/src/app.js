// const express=require("express")
// const app=express()
// app.get("/",(req,res)=>{
//     res.send("welcome to my app")
//     console.log("welcome to my app")
// })
// app.get("/products", (req, res) => {
//   const products = [
//     {
//       id: 1,
//       name: "Laptop",
//       price: 100000.0,
//       category:"Electronics",
//       stock:3
//     },
//     {
//       id: 4,
//       name: "Keyboard",
//       price: 10000.0,
//       category:"Hardware",
//       stock:2
//     },
//     {
//       id: 2,
//       name: "Mobile",
//       price: 25000.0,
//       category:"Electronics",
//       stock:5
//     },
//     {
//       id: 3,
//       name: "Headphone",
//       price: 35000.0,
//       category:"accessories",
//       stock:6
//     }//the sequence of display of individual product objects is decided in same sequence as the one in which we
//   ];
//   res.json(products);
// });
// app.listen(3000, () => {
//   console.log("server started....");
// });
// import express from "express"
const express = require("express");
const app = express();
const errorhandler=require("./middleware/errorHandler")
const logger=require("./middleware/logger")
//named export version
//const {productRouter}=require("./routes/productRoutes");
const productRoutes = require("./routes/productRoutes");
app.use(express.json())
app.use(logger)
app.use(errorhandler)
app.use(productRoutes); //here to app.use we can add url as first parameter like /api/v1 then we dont need to change anythig anywehre but then our prodcts will lie oin url
//localhost:3000/api/v1/products because the app.use url is basically adde to product router url it is basically acting as base url to use at start
module.exports=app
//api
//app->router->controller->accesses data->back to router->in router we say hey router if user will go to /products you get the data t odispaly using getallpa=rodicts function
//app we do entire communcation,now we go to router where we jave many paths,from here we go to router and from router we go to controller(implements bussiness logic not have data) which uses data frpm data folder in node format which controller convert to json format  we create a json object ,go back to router,router will get data for user and export it to app.js
//bhy default express doesnt understand json,we need to add one line so that express interacts with json
//to convert express object into json and back we need to do a change in entire application
//for a change in entier applicaiton we need to do a change in app.js