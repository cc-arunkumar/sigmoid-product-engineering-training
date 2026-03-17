const products = require("../data/products");
//defautl exports
exports.getAllProducts = (req, res) => {
  res.json(products);
};
