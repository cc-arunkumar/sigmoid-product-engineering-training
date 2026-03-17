const { successResponse } = require("../utils/apiResponse");
let products = require("../data/products");


const getAllProducts = (req, res) => {
  return successResponse(
    res,
    "Products fetched successfully",
    {
      results: products.length,
      products
    }
  );
};


const getProductById = (req, res, next) => {
  const productId = Number(req.params.id);

  const product = products.find(p => p.id === productId);

  if (!product) {
    const error = new Error("Wrong ID");
    error.statusCode = 404;
    return next(error);
  }

  return successResponse(res, "Product fetched successfully", product);
};


const createProduct = (req, res) => {
  const { name, price, stock, category } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
    stock
  };

  products.push(newProduct);

  return successResponse(res, "Product created", newProduct, 201);
};


const updateProducts = (req, res, next) => {
  const productId = Number(req.params.id);

  const product = products.find(p => p.id === productId);

  if (!product) {
    const error = new Error("Wrong ID");
    error.statusCode = 404;
    return next(error);
  }

  const { name, price, stock, category } = req.body;

  product.name = name;
  product.price = price;
  product.stock = stock;
  product.category = category;

  return successResponse(res, "Product updated", product);
};


const patchProduct = (req, res, next) => {
  const productId = Number(req.params.id);

  const product = products.find(p => p.id === productId);

  if (!product) {
    const error = new Error("Wrong ID");
    error.statusCode = 404;
    return next(error);
  }

  Object.keys(req.body).forEach(key => {
    product[key] = req.body[key];
  });

  return successResponse(res, "Product partially updated", product);
};


const deleteById = (req, res, next) => {
  const productId = Number(req.params.id);

  const product = products.find(p => p.id === productId);

  if (!product) {
    const error = new Error("Wrong ID");
    error.statusCode = 404;
    return next(error);
  }

  products = products.filter(p => p.id !== productId);

  return successResponse(res, "Product deleted", null);
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProducts,
  patchProduct,
  deleteById
};