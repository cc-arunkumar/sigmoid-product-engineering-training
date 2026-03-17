let products = require("../data/products");

const apiResponse = require("../utils/apiResponse");

exports.getAllProducts = (req,res) => {
    res.json(products);
};

exports.getProductById = (req,res,next) => {
    const productId = parseInt(req.params.id);      // in request params are all the parameters from there select on eparameter id
    const product = products.find(p => p.id === productId);

    // if(!product){
    //     return res.status(404).json({
    //         message : "Not Found!"
    //     });
    // }

    if(!product){
        const error = new Error("Product Id not found");
        error.statusCode = 404;
        return next(error);
    }

    // res.json(product);
    apiResponse.successResponse(res, "Product retrieved successfully", product);
};

exports.createProduct = (req,res) => {
    const { name, price, category, stock } = req.body;

    const product = {
        id :  100 + products.length + 1,
        name : name,
        category : category,
        price : price,
        stock : stock
    }

    products.push(product);

    // res.status(201).json(product);
    apiResponse.successResponse(res, "Product created successfully", product, 201);
};

exports.updateProduct = (req,res,next) => {
    const productId = parseInt(req.params.id);
    const { name, price, category, stock } = req.body;

    const product = products.find(p => p.id === productId);

    // if(!product){
    //     return res.status(404).json({
    //         message : "Not Found!"
    //     });
    // }

    if(!product){
        const error = new Error("Product not found to update");
        error.statusCode = 404;
        return next(error);
    }


    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;

    // res.json(product);
    apiResponse.successResponse(res, "Product updated successfully", product);
};

exports.deleteProductById = (req,res,next) => {
    const productId = req.params.id * 1;
    const product = products.find(p => p.id === productId);

    // if(!product){
    //     return res.status(404).json({
    //         message : "product not found"
    //     })
    // }

    if(!product){
        const error = new Error("Product not found to delete");
        error.statusCode = 404;
        return next(error);
    }

    products=products.filter(p => p.id !== productId);
    // res.status(201).json(products);

    apiResponse.successResponse(res, "Product deleted successfully", products);
};


exports.updatePartialProduct = (req, res, next) => {
    const productId = req.params.id * 1;
    const product = products.find(p => p.id === productId);

    // if(!product){
    //     return res.status(404).json({
    //         message : "product not found"
    //     })
    // } 

    if(!product){
        const error = new Error("Product Id not found to partially update");
        error.statusCode = 404;
        return next(error);
    } 

    const {name, category, stock, price} = req.body;
    
    if(name != undefined){
        product.name = name;
    }
    if(category != undefined){
        product.category = category;
    }
    if(stock != undefined){
        product.stock = stock;
    }
    if(price != undefined){
        product.price = price;
    }
    // res.status(200).json(product);
    apiResponse.successResponse(res, "Product updated successfully", product);

};

