const logger=(req, res, next)=>{
      
    const method=req.method;
    const url=req.url;
    let time=new Date().isISOstring();
    
    console.log(`${method} : ${url}-> ${time}`)

    next();

};

module.exports=logger;