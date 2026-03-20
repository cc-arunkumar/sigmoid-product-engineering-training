// const validateProductPartial = (req, res, next) => {
//     const {name, price, category, stock} = req.body;

//     if(name !== undefined && name.trim() === "" || name.length == 0){
//         return res.status(400).json({
//             success: false,
//             message: "Name is required and should not be empty"
//         });
//     }
//     if(price !== undefined && (price <= 0)){
//         return res.status(400).json({
//             success: false,
//             message: "Price is required and should be a positive number"
//         });
//     }
//     if(category !== undefined && category.trim() === "" || category.length == 0){
//         return res.status(400).json({
//             success: false,
//             message: "Category is required and should not be empty"
//         });
//     }
//     if(stock !== undefined && (stock < 0)){
//         return res.status(400).json({
//             success: false,
//             message: "Stock is required and should be a non-negative number"
//         });
//     }
//     next();
// };

// module.exports = validateProductPartial;



