

const logger = (req , res , next)=>{

    const method = req.method;
    const url = req.url;

    const time = new Date() ; 


    const print = `method: ${method} , url : ${url} , time : ${time}` ; 
    console.log(print);
    res.json(print) ; 


    next();
}



module.exports = logger ; 