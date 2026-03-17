const products = require("../data/products")

exports.getAll = (req, res) => {
    res.json(products);
}

exports.getProduct = (req, res) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product) res.status(404).json({message: `No product found with product id - ${productId}.`});

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

exports.updateProduct = (req, res) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product) res.status(404).json({message: `No product found with product id - ${productId}.`});

    const {name, price, category, stock} = req.body;
    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;
    
    res.json(product);
}