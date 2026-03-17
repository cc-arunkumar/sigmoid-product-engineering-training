const logger = (req,res,next) => {
    const method = req.method; //to get method
    const url = req.url;//to get the url
    const time = new Date().toISOString();//for date and time 

    console.log(`${method} ${url} - ${time}`);

    next(); //if not added no API will reach controller
};
module.exports = logger;