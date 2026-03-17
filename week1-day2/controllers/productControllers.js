let products = require("../data/products")

exports.getAll = (req, res) => {
    res.json(products);
}

exports.getProduct = (req, res, next) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product){
        const error=new Error("wrong ID");
        error.statusCode=404
        return next(error)
    }

    res.json(product);
}

exports.addProduct = (req, res) => {
    const {name, price, category, stock} = req.body;
    const newProduct = {
        id: products.length + 101,
        name,
        price,
        category,
        stock
    }
    
    products.push(newProduct);
    res.json(newProduct);
}

exports.updateProduct = (req, res, next) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product){
        const error=new Error("wrong ID");
        error.statusCode=404
        return next(error)
    }

    const {name, price, category, stock} = req.body;
    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;
    
    res.json(product);
}

exports.partialUpdateProduct = (req, res, next) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product){
        const error=new Error("wrong ID");
        error.statusCode=404
        return next(error)
    }

    Object.keys(req.body).forEach(x => product[x] = req.body[x]);    
    res.json(product);
}

exports.deleteProduct = (req, res, next) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product){
        const error=new Error("wrong ID");
        error.statusCode=404
        return next(error)
    }
    
    products = products.filter(p => p.id !== productId);
    res.json({message: `Product with product id - ${productId} is deleted succesfully.`})
}