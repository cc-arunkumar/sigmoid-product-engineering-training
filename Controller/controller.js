const product  = require("../Data/data")

// exports.getallProducts = (req , res) =>{
//     res.json(product)
// }



// exports.getproductbyId = (req , res , next)=>{
//     const prodid = req.params.id *1;  
//     const prodfoundid = product.find(p => p.id === prodid) ; 

//     if(!prodfoundid){
//         const error = new Error("invalid user"); 
//         error.statusCode = 400 ; 
//         return next(error)  ; 
//     }
//     return res.json(prodfoundid)

// }


// exports.postproduct = (req , res)=>{
//     const {name , price , brand } = req.body;


//     const newproduct = {
//         id : product.length+1 , 
//         name : name , 
//         price : price  , 
//         brand : brand 
//     }
//     product.push(newproduct);

//     return res.status(201).json(newproduct) ; 
// }

// exports.putproduct = (req , res)=>{
//     const {id , name , price  , brand } = req.body ; 

//     const productfound = product.find(p => p.id== id) ; 

//     productfound.name = name ; 
//     productfound.price = price ; 
//     productfound.brand = brand ; 

//     return res.status(200).json(productfound);
// }

// exports.deleteproduct = (req , res)=>{
//     const id = req.params.id * 1;

//     const index = product.findIndex(p => p.id === id);

//     if(index === -1){
//         return res.status(400).json({
//             message: "Not Found"
//         });
//     }

//     const deletedProduct = product.splice(index , 1);

//     return res.status(200).json(deletedProduct[0]);
// };


const products = require("../Data/data");
const { successResponse } = require("../utils/apiresponce");
// GET all products

exports.getAllProducts = (req, res, next) => {
    try {
        return successResponse(res, "All products fetched successfully", products);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to fetch products"
        });
    }
};

// GET product by ID

exports.getProductById = (req, res, next) => {
    try {
        const productId = (req.params.id) * 1;
        const product = products.find(p => p.id === productId);
        if (!product) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }
        return successResponse(res, "Product fetched successfully", product);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to fetch product"
        });
    }
};

// CREATE product (POST)
exports.createProduct = (req, res, next) => {
    try {
        const { name, price, category, stock } = req.body;
        const newProduct = {
            id: products.length + 1,
            name,
            price,
            category,
            stock
        };
        products.push(newProduct);
        return successResponse(res, "Product created successfully", newProduct);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to create product"
        });
    }
};


// UPDATE product (PUT)
exports.updateProduct = (req, res, next) => {
    try {
        const productId = (req.params.id) * 1;
        const index = products.findIndex(p => p.id === productId);
        if (index === -1) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }
        const { name, price, category, stock } = req.body;
        products[index] = {
            id: productId,
            name,
            price,
            category,
            stock
        };
        return successResponse(res, "Product updated successfully", products[index]);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to update product"
        });
    }
};

// PATCH
exports.patchProduct = (req, res, next) => {
    try {
        const productId = (req.params.id) * 1;
        const product = products.find(p => p.id === productId);
        if (!product) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }
        Object.assign(product, req.body);
        return successResponse(res, "Product updated partially", product);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to patch product"
        });
    }
};
// DELETE

exports.deleteProduct = (req, res, next) => {
    try {
        const productId = (req.params.id) * 1;
        const index = products.findIndex(p => p.id === productId);
        if (index === -1) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }
        const deleted = products.splice(index, 1);
        return successResponse(res, "Product deleted successfully", deleted);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to delete product"

        });
    }
};