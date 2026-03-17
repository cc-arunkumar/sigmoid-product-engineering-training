const express=require("express") 

const app=express() 

app.get("/",(req,res)=>{ 
    res.send("Welcome");    
})

app.get("/products",(req,res)=>{
    const products=[
        {
            id:102,name:"Keyboard",price:25000.00
        },
        {
            id:101,name:"Laptop",price:100000.00
        },
        {
            id:103,name:"Headphones",price:60000.00
        },
        {
            id:104,name:"Mobile",rice:90000.00
        }
    ]
    res.json(products) 
})

app.listen(3000, () => {     
    console.log("Yes")
})