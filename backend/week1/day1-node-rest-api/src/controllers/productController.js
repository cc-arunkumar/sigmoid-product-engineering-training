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
