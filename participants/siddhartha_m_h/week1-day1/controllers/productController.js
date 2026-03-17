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

function handleAddProducts (req, res) {
    const newProduct = req.body;
    if (!newProduct) {
        return res.status(400).json({message: "Body required"});
    }
    products.push(newProduct);
    return res.status(201).json({
        message: "New product added"
    });
}

module.exports = {
    getAllProducts,
    getProductById,
    handleAddProducts
}