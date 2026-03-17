const products = require("../data/products");

exports.getAllProducts = (req, res) => {
    res.json(products);
}

exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(400).json({
            message: "Product Not found"
        });
    };

    res.json(product);
};