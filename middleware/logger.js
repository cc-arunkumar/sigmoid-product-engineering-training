const logger=(req,res,next)=>{
    const method = req.method;
    const url = req.url;
    const timestamp = new Date().toISOString();
    console.log(`${method} : ${url} at ${timestamp}`);
    next();
}

module.exports=logger;