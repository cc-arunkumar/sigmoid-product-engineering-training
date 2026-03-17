const express=require("express") //require express libraries  

const app=express()  //initialisation of express   app bascally an object 

app.get("/",(req, res)=>{
  console.log("welcom to backend");
  res.send("welcome to backend !!");
});

app.listen(3000, ()=>{ //lammda function (anonymous functions)
    console.log("server is running")
})