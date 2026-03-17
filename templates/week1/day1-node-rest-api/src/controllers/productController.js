const products = require('../data/products');

// GET ALL
exports.getAllProducts = (req, res) => {
  res.json(products);
};

// GET BY ID
exports.getProductById = (req, res) => {
  const productId = parseInt(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
};

// CREATE
exports.createProduct = (req, res) => {
  const { name, price, category, stock } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
    stock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

// UPDATE (PUT - full update)
exports.updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const { name, price, category, stock } = req.body;

  // safer than ||
  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.category = category ?? product.category;
  product.stock = stock ?? product.stock;

  res.status(200).json(product);
};

// DELETE
exports.deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);

  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.status(204).send();
};

// PATCH (partial update)
exports.updatePartialProduct = (req, res) => {
  const productId = parseInt(req.params.id);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const { name, price, category, stock } = req.body;

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (category !== undefined) product.category = category;
  if (stock !== undefined) product.stock = stock;

  res.status(200).json(product);
};