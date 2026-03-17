const express = require("express");

const app = express()

app.get("/",(req,res)=>{
     res.send("Hello World i am yuvraj singh hiii");
 });


 app.get("/",(req,res)=>{
    res.send("Hello World i am yuvraj singh hiii");
})


app.get("/products",(req,res) => {
    const products = [
        {
            id:101,
            name:"laptop",
            price:50000
        },
        {
            id:101,
            name:"Mobile",
            price:100000
        },
        {
            id:101,
            name:"Headphones",
            price:160000
        },
        {
            id:101,
            name:"Keyboard",
            price:1500000
        }
    ]
    res.json(products)

});




 app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})