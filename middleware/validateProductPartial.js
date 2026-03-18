// const validateProduct = require("./validateProduct")

// const validateProductPartial=(req,res,next)=>{
//     const {name,price,category,stocks}=req.body;

//     if (name !== undefined && name.trim() === "") {
//         return res.status(400).json({status: false,message:"Product name cannot be empty"});
//     }  
//     if (price !== undefined && price <= 0) {
//         return res.status(400).json({status: false,message:"Product price must be a positive number"});
//     }
//     if (category !== undefined && category.trim() === "") {
//         return res.status(400).json({status: false,message:"Product category cannot be empty"});
//     }
//     if (stocks !== undefined && stocks < 0) {
//         return res.status(400).json({status: false,message:"Product stocks must be a non-negative number"});
//     }
//     next();
// }
// module.exports=validateProductPartial;


const { errorResponse } = require("../util/apiResponse"); 


const validateProductPartial = (req, res, next) => { 

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

 

module.exports = validateProductPartial; 