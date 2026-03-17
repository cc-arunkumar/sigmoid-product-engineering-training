let products = require("../data/products");

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.getProductById = (req, res) => {
  let prodId = parseInt(req.params.id);
  // let prodId = Number(req.params.id);

  const product = products.find((p) => p.id === prodId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.send(product);
};
