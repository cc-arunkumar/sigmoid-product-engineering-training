const products = require("../data/product.js");

exports.getAllProducts = (req, res) => {
    res.json(products); //getting data from data folder and converting to json format then sending it to routes 
};


exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
};

exports.createProduct = (req, res) =>{
    const {name, price, category, stock} = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price, 
        category,
        stock
    }

    products.push(newProduct);

    return res.status(200).json(newProduct);
}

exports.updateProduct = (req, res) => {

    const productId = req.params.id * 1;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            message: "product not found"
        });
    }

    const { name, price, category, stock } = req.body;

    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;

    return res.status(200).json(product);
}

exports.deleteProduct = (req, res) => {
    const productId = req.params.id * 1;
    const product = products.find(p => p.id === productId);

    if(!product){
        res.status(400).json("Not found id");
    }

    products.pop(product);

    return res.status(200).json({message: "deleted successfully"});
}

exports.updatePartialProduct = (req, res) => {
    const productId = req.params.id * 1;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            message: "product not found"
        });
    }

    const { name, price, category, stock } = req.body;

    if(name != undefined){
        product.name = name;
    }

    if(price != undefined){
        product.price = price;
    }

    if(category != undefined){
        product.category = category;
    }

    if(stock != undefined){
        product.stock = stock;
    }    

    return res.status(200).json(product);
}