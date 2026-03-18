const products = require("../data/product");
const {successResponse} = require("../utils/apiResponse");
const AppError = require("../utils/appError");

//GET all products
exports.getAllProducts=(req, res)=>{
     try {
        successResponse(res, products, "Products retrieved successfully");
    }
    catch (error) {
        return next(new AppError(error.message || "Failed to retrieve products", 500));
    }
};

//GET product by id
exports.getProductById= (req, res)=>{
    try {
        const productId= parseInt(req.params.id);
        const product= products.find(p=>p.id===productId);
        if(!product){
            return next(new AppError("Product not found", 404));
        }
        return successResponse(res, product, "Product fetched successfully");
    } catch (error) {
        return next(new AppError(error.message || "Failed to fetch product", 500));
    }
    };


//CREATE new product
exports.createProduct = (req,res)=>{
    
    try {
        const {name, price, category, stock}= req.body;
        const newProduct={
            id: products[products.length-1].id+1,
            name: name,
            price: price,
            category: category,
            stock: stock
        }
        console.log("Newly created product = ", newProduct);
        products.push(newProduct);
        return successResponse(res, newProduct, "Product created successfully", 201);
    }
    catch (error) {
        return next(new AppError(error.message || "Failed to create product", 500));
    }
};

//UPDATE product by id
exports.updateP= (req,res)=>{
    try {
        const productID= req.params.id*1;
        const product= products.find(p=>p.id===productID);
        
        if(index === -1){
            return next(new AppError("Product not found", 404));
        }
        const {name, price, category, stock}= req.body;
        product.name= name;
        product.price= price;
        product.category= category;
        product.stock= stock;

       return successResponse(res, product, "Product updated successfully", products[index]);
    }
    catch (error) {
        return next(new AppError(error.message || "Failed to update product", 500));
    }
}
exports.deleteProduct =(req,res)=>{
    try {
        const productID= req.params.id*1;
        const index= products.findIndex(p=>p.id===productID);
        if(index === -1){
            return next(new AppError("Product not found", 404));
        }
        const deletedProduct= products.splice(index, 1);
        return successResponse(res, deletedProduct[0], "Product deleted successfully");
    }
    catch (error) {
        return next(new AppError(error.message || "Failed to delete product", 500));
    }   
}

exports.patchProduct= (req,res)=>{
    try {
        const productID= req.params.id*1;
        const product= products.find(p=>p.id===productID);
        
     if(!product){
        return next(new AppError("Product not found", 404));

     }
     Object.assign(product, req.body);
     return successResponse(res, product, "Product patched successfully");
    }
    catch (error) {
        return next(new AppError(error.message || "Failed to patch product", 500));
    }
};
