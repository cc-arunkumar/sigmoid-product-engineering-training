const products = require("../data/products");
const { successResponse } = require("../utils/apiResponse");

// GET all products
exports.getAllProducts = (req, res, next) => {
  try {
    return successResponse(res, "All products fetched successfully", products);
  } catch (error) {
    return next(error);
  }
};

// GET product by ID
exports.getProductById = (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.product_id === productId);

    if (!product) {
      return next({ statusCode: 404, message: "Product not found" });
    }

    return successResponse(res, "Product fetched successfully", product);
  } catch (error) {
    return next(error);
  }
};

// CREATE product
exports.createProduct = (req, res, next) => {
  try {
    const { product_name, product_price, category, stock } = req.body;

    if (!product_name || !product_price) {
      return next({
        statusCode: 400,
        message: "Product name and price are required"
      });
    }

    const newProduct = {
      product_id: products.length + 1,
      product_name,
      product_price,
      category,
      stock
    };

    products.push(newProduct);

    return successResponse(res, "Product created successfully", newProduct);
  } catch (error) {
    return next(error);
  }
};

// UPDATE product (PUT)
exports.updateProduct = (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.product_id === productId);

    if (!product) {
      return next({ statusCode: 404, message: "Product not found" });
    }

    const { product_name, product_price, category, stock } = req.body;

    if (!product_name || !product_price) {
      return next({
        statusCode: 400,
        message: "Product name and price are required"
      });
    }

    product.product_name = product_name;
    product.product_price = product_price;
    product.category = category;
    product.stock = stock;

    return successResponse(res, "Product updated successfully", product);
  } catch (error) {
    return next(error);
  }
};

// PATCH product
exports.updateProductPartially = (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.product_id === productId);

    if (!product) {
      return next({ statusCode: 404, message: "Product not found" });
    }

    Object.assign(product, req.body);

    return successResponse(res, "Product partially updated", product);
  } catch (error) {
    return next(error);
  }
};

// DELETE product
exports.deleteProduct = (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.product_id === productId);

    if (index === -1) {
      return next({ statusCode: 404, message: "Product not found" });
    }

    const deletedProduct = products.splice(index, 1);

    return successResponse(res, "Product deleted successfully", deletedProduct);
  } catch (error) {
    return next(error);
  }
};