let { products } = require("../data/products");

exports.getAllproducts = (req, res) => {
  res.json({
    data: products,
  });
};

exports.getProductsById = (req, res, next) => {
  const id = req.params.productId * 1;
  const product = products.find((ele) => ele.id === id);
  if (!product) {
    const error = new Error("Invalid product Id!");
    error.statusCode = 400;
    return next(error);
  }
  res.status(201).json(product);
};

exports.createPost = (req, res) => {
  const { name, price, stock, category } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
    stock,
  };
  products.push(newProduct);

  res.status(201).json({
    message: "New product added",
    data: newProduct,
  });
};

exports.editPost = (req, res) => {
  const id = req.params.productId * 1;

  let pr = products.find((ele) => ele.id === id);

  Object.keys(req.body).forEach((key) => {
    pr[key] = req.body[key];
  });

  res.status(201).json({
    message: "product edited successfully",
    data: pr,
  });
};

exports.updatePost = (req, res) => {
  const id = req.params.productId * 1;
  const { name, price, stock, category } = req.body;

  let pr = products.find((ele) => ele.id === id);

  pr.name = name;
  pr.price = price;
  pr.stock = stock;
  pr.category = category;

  res.status(201).json({
    message: "product updated successfully",
    data: pr,
  });
};

exports.deletePost = (req, res) => {
  const id = req.params.productId * 1;

  products = products.filter((ele) => ele.id !== id);
  res.status(201).json({
    message: "product deleted successfully",
  });
};
