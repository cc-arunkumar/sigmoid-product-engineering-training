let { products } = require("../data/products");

exports.getAllproducts = (req, res) => {
  res.json({
    data: products,
  });
};
