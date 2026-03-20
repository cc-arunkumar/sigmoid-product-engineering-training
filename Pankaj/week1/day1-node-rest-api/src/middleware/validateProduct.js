const {errorResponse} = require("../utils/apiResponse");
const validateProduct = (req, res, next)=> {
    const {name, price, category, stock} = req.body;

    if(typeof name !== "string" || name.trim()==="" || name.length == 0){
        return errorResponse(res, "Name is required and should not be empty", 400);
    }

    if(typeof price !== "number" || price <= 0){
        return errorResponse(res, "Price is required and should be a positive number", 400);
    }
    if(typeof category !== "string" || category.trim() === "" || category.length == 0){
        return errorResponse(res, "Category is required and should not be empty", 400);
    }
    if(typeof stock !== "number" ||isNaN(stock) ||  stock < 0){
        return errorResponse(res, "Stock is required and should be a non-negative number", 400);
    }

    next();

    
};

module.exports = validateProduct;