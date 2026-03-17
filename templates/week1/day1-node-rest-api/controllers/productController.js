let products = require("../data/products");
const { successResponse } = require("../utils/apiResponse");

exports.getAllProducts = (req, res) => {
  successResponse(res, "Products fetched successfully", products);
  res.json(products);
};

exports.getProductById = (req, res, next) => {
  const prodId = parseInt(req.params.id);

  const product = products.find((p) => p.id === prodId);

  if (!product) {
    const err =  new Error("Product not found");
    err.statusCode = 404;
    return next(err);
  }

  successResponse(res, "Product ID fetched successfully", products);

  res.json(product);
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    id: products.length + 101,
    name: name,
    price: price,
  };

  products.push(newProduct);
  res.json(newProduct);
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

exports.updatePartialProduct = (req, res) => {
  const productId = Number(req.params.id);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, price, category, stock } = req.body;

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (category !== undefined) product.category = category;
  if (stock !== undefined) product.stock = stock;

  res.json(product);
};