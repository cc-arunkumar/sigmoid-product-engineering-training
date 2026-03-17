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

exports.createProduct = (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    id: products.length + 101,
    name: name,
    price: price,
  };

  products.push(newProduct);
  res.send(newProduct);
};

exports.updateProduct = (req, res) => {
  const { name, price } = req.body;

  let prodId = parseInt(req.params.id);
  const product = products.find((p) => p.id === prodId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.name = name;
  product.price = price;

  res.status(200).send(product);
};

exports.deleteProduct = (req, res) => {
  let prodId = parseInt(req.params.id);
  let product = products.find((p) => p.id === prodId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  let newProducts = products.filter((p) => p.id != prodId);

  products = newProducts;

  res.status(200).send(products);
};
