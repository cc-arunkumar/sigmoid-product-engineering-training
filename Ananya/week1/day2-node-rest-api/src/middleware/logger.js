const logger =(req,res,next) =>{

    const method = req.method;
    const url= req.url;
    const date= new Date().toDateString();

    console.log(`${method}: ${url}-${date}`)

    next();
   
}
 module.exports=logger;