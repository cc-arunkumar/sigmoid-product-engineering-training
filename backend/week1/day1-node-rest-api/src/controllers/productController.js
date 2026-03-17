let { products } = require("../data/products");

exports.getAllproducts = (req, res) => {
  res.json({
    data: products,
  });
};

exports.getProductsById = (req, res) => {
  const id = req.params.productId * 1;
  const product = products.find((ele) => ele.id === id);
  res.status(201).json(product);
};
