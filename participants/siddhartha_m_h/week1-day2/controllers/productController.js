const products = require('../data/product')

function getAllProducts (req, res) {
    return res.json(products);
}

function getProductById (req, res, next) {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id); 

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }

    res.json(product);
}

function handleAddProducts (req, res, next) {
    const newProduct = req.body;
    if (!newProduct) {
        const error = new Error("Body required");
        error.statusCode = 400;
        return next(error);
    }
    products.push(newProduct);
    return res.status(201).json({
        message: "New product added"
    });
}

function handleDeleteProductById (req, res, next) {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if(index === -1){
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }
    products.splice(index,1);
    return res.status(200).json({
        message: "Deleted successfully"
    });
}

function handleUpdateProducts (req, res, next) {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if(!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }

    const { name, price, category, stock } = req.body;
    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;

    return res.status(200).json(product);
}

function handlePatchProduct (req, res, next) {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if(!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }               

    const { name, price, category, stock } = req.body;
    
    if (name != undefined) {
        product.name = name;
    }

    if (price != undefined) {
        product.price = price;
    }

    if (category != undefined) {
        product.category = category;
    }

    if (stock != undefined) {
        product.stock = stock;
    }

    return res.status(200).json({
        message : "Patch successful"
    });
}

module.exports = {
    getAllProducts,
    getProductById,
    handleAddProducts,
    handleDeleteProductById,
    handleUpdateProducts,
    handlePatchProduct
}