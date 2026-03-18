const products = require("../data/product");
const {successResponse} = require("../utils/apiResponse");

//GET all products
exports.getAllProducts=(req, res)=>{
     try {
        successResponse(res, products, "Products retrieved successfully");
    }
    catch (error) {
        return next({
            status: 500,
            message: error.message || "Failed to fetch products"
        });
}
};

//GET product by id
exports.getProductById= (req, res)=>{
    try {
        const productId= parseInt(req.params.id);
        const product= products.find(p=>p.id===productId);
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        successResponse(res, product, "Product fetched successfully");
    } catch (error) {
        return next({
            status: 500,
            message: error.message || "Failed to fetch product"
        });
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
        res.status(201).json({
            status: 201,
            message: "Product created successfully",
            product: newProduct
        })
    }
    catch (error) {
        return next({
            status: 500,
            message: error.message || "Failed to create product"
        });
    }
}

//UPDATE product by id
exports.updateP= (req,res)=>{
    try {
        const productID= req.params.id*1;
        const product= products.find(p=>p.id===productID);
        
        if(index === -1){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        const {name, price, category, stock}= req.body;
        product.name= name;
        product.price= price;
        product.category= category;
        product.stock= stock;

       return successResponse(res, product, "Product updated successfully", products[index]);
    }
    catch (error) {
        return next({
            status: 500,
            message: error.message || "Failed to update product"
        });
    }
}
exports.deleteP =(req,res)=>{
    try {
        const productID= req.params.id*1;
        const index= products.findIndex(p=>p.id===productID);
        if(index === -1){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        products.splice(index, 1);
        res.json({
            message: "Product deleted successfully"
        });
    }
    catch (error) {
        return next({
            status: 500,
            message: error.message || "Failed to delete product"
        });
    }
}

exports.patchP= (req,res)=>{
    try {
        const productID= req.params.id*1;
        const product= products.find(p=>p.id===productID);
        
        if(index === -1){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        const {name, price, category, stock}= req.body;
        if(name !== undefined){
            product.name= name;
        }
        if(price !== undefined){
            product.price= price;
        }
        if(category !== undefined){
            product.category= category;
        }
        if(stock !== undefined){
            product.stock= stock;
        }

       return successResponse(res, product, "Product updated successfully", products[index]);
    }
    catch (error) {
        return next({
            status: 500,
            message: error.message || "Failed to update product"
        });
    }
}   
