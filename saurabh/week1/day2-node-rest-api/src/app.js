const express= require("express") // express is module with which we will create our apis
const app = express() 

const productRoutes= require("./routes/productRouter");
const loggers= require("./middleware/logger");
 // middleware so that our express understands the data send in the json format
 app.use(express.json());
app.use(loggers);
app.use(productRoutes);

app.get("/api", (req, res)=>{
    res.send("welcome to backend"); // sending the response
});

const errorHandler= require("./middleware/errorHandler");
app.use(errorHandler);


app.listen(3000, ()=>{
    console.log("server started")
    
})