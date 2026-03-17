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