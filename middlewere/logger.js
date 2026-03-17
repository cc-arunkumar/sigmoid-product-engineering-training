

const logger = (req, res, next) => {

    const method = req.method;
    const url = req.url;

    const time = new Date();

    console.log("printing logger")
    const print = `method: ${method} , url : ${url} , time : ${time}`;
    console.log(print);
    // res.json(print) ; 


    next();
}
const validation = (req, res, next) => {

    const { name, price, brand } = req.body;

    console.log("validation called");

    if (!name || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Product name is required"
        });
    }

    if (price === undefined || price <= 0) {
        return res.status(400).json({
            success: false,
            message: "Price must be greater than 0"
        });
    }

    if (!brand || brand.trim() === "") {
        console.log("brand nahi paya hai")
        return res.status(400).json({
            success: false,
            message: "Brand is required"
        });
        console.log("ye chalegha hi nahi")
    }
    console.log("everything is good")
    next();
}




const errorHandler = (err, req, res, next) => {

    console.error(err.stack);
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

};





module.exports = {
    logger,
    validation ,
    errorHandler 
}