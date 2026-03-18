const express= require("express") // express is module with which we will create our apis
const app = express() // entire express is initialized and kept in the app

app.get("/", (req, res)=>{
    res.send("welcome to backend"); // sending the response
}) ;

app.listen(3000, ()=>{
    console.log("server started")
    
})