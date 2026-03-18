
// const validateProduct = (req, res , next) =>{
//   const { name , price , category , stock , brand} = req.body;

//    if(!name || name.trim()===""){
//     return res.status(400).json({
//       success : false,
//       message : " product name is required"
//     })
//    }

//    if(price === undefined || price <= 0){
//     return res.status(400).json({
//       success : false,
//       message : "Valid product price is required"
//     })
//    }

   

//    if(!category || category.trim()===""){
//     return res.status(400).json({
//       success : false,
//       message : " product category is required"
//     })
//    }

//    if(stock === undefined || stock < 0){
//     return res.status(400).json({
//       success : false,
//       message : "Valid product stock is required"
//     })
//    }
//    if(!brand || brand.trim()===""){
//     return res.status(400).json({
//       success : false,
//       message : " product brand is required"
//     })
//    }

//    next();
// }


// module.exports = validateProduct;

const { errorResponse } = require("../utils/apiResponse");


const validateProduct = (req, res, next) => {


const { name, price, category, stock } = req.body;


// NAME

if (typeof name !== "string" || name.trim() === "") {

return errorResponse(res, "Product name must be a non-empty string", 400);

}


// PRICE

if (typeof price !== "number" || isNaN(price) || price <= 0) {

return errorResponse(res, "Price must be a number greater than 0", 400);

}


// CATEGORY

if (typeof category !== "string" || category.trim() === "") {

return errorResponse(res, "Category must be a non-empty string", 400);

}


// STOCK

if (typeof stock !== "number" || isNaN(stock) || stock < 0) {

return errorResponse(res, "Stock must be a non-negative number", 400);

}

next();

};


module.exports = validateProduct;
