// const validatePartialProduct = (req,res,next) => {
    
//     const {name,price,category,stock} = req.body;

//     if(name!==undefined && name.trim() === ""){
//         return res.status(400).json({
//             success:false,
//             message:"Product name is required"
//         });
//     }

//     if(price !== undefined && price<=0){
//         return res.status(400).json({
//             success:false,
//             message:"Price must be greater than 0"
//         });
//     }

//     if(category !== undefined && category.trim() === ""){
//         return res.status(400).json({
//             success:false,
//             message:"Category is required"
//         });
//     }

//     if(stock !== undefined && stock<=0){
//         return res.status(400).json({
//             success:false,
//             message:"Invalid Stock"
//         });
//     }

//     next();

// }
// module.exports = validatePartialProduct;
const { errorResponse } = require("../utils/apiResponse");
const validatePartialProduct = (req, res, next) => {
    const { name, stock, price, category } = req.body;
    const errors = [];
    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            errors.push("Name must be a valid string");
        }
    }
    if (stock !== undefined) {
        if (typeof stock !== "number" || stock < 0) {
            errors.push("Stock must be a number >= 0");
        }
    }
    if (price !== undefined) {
        if (typeof price !== "number" || price <= 0) {
            errors.push("Price must be a number > 0");
        }
    }
    if (category !== undefined) {
        if (typeof category !== "string" || category.trim() === "") {
            errors.push("Category must be a valid string");
        }
    }
    if (errors.length > 0) {
        return errorResponse(res, errors, 400);
    }
    next();
};
module.exports = validatePartialProduct;