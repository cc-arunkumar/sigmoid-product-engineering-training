const products = require('../data/product')

function getAllProducts (req, res) {
    return res.json(products);
}

function getProductById (req, res) {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id); 

    if (!product) {
        return res.status(404).json({
            message: "Product Not Found"
        });
    }

    res.json(product);
}

module.exports = {
    getAllProducts,
    getProductById
}