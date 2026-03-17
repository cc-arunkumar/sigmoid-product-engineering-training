const products = require("../data/products")

exports.getAll = (req, res) => {
    res.json(products);
}