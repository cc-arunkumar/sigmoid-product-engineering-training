const products = require('../data/product')

function getAllProducts (req, res) {
    return res.json(products);
}


module.exports = {
    getAllProducts
}