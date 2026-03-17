let products = require("../data/products");

exports.getAllProducts = (req,res) => {
    res.json(products);
};

exports.getProductById = (req,res) => {
    const productId = parseInt(req.params.id);      // in request params are all the parameters from there select on eparameter id
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({
            message : "Not Found!"
        });
    }
    res.json(product);
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

    res.status(201).json(product)
};

exports.updateProduct = (req,res) => {
    const productId = parseInt(req.params.id);
    const { name, price, category, stock } = req.body;

    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({
            message : "Not Found!"
        });
    }
    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;

    res.json(product);
};

exports.deleteProductById = (req,res) => {
    const productId = req.params.id * 1;
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({
            message : "product not found"
        })
    }

    products=products.filter(p => p.id !== productId);
    res.status(201).json(products);
};


exports.updatePartialProduct = (req, res) => {
    const productId = req.params.id * 1;
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({
            message : "product not found"
        })
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
    res.status(200).json(product);
};

