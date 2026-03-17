const products = require("../data/products")
exports.getALLProducts = (req, res) => {
    res.json(products);
};
