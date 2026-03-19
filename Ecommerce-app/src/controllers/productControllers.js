const Product = require("../models/product.mongo.js");
const AppError = require("../utils/AppError");
const AppResponse = require("../utils/AppResponse");

// GET all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    return new AppResponse(res, "All products fetched successfully", products);
  } catch (error) {
    return next(new AppError(error.message || "Failed to fetch products", 500));
  }
};

// GET product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return new AppResponse(res, "Product fetched successfully", product);
  } catch (error) {
    return next(new AppError(error.message || "Failed to fetch product", 500));
  }
};

// CREATE product (POST)
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock } = req.body;

    const newProduct = await Product.create({
      name,
      price,
      category,
      stock,
    });

    return new AppResponse(
      res,
      "Product created successfully",
      newProduct,
      201,
    );
  } catch (error) {
    return next(new AppError(error.message || "Failed to create product", 500));
  }
};

// UPDATE product (PUT)
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, stock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return next(new AppError("Product not found", 404));
    }

    return new AppResponse(
      res,
      "Product updated successfully",
      updatedProduct,
    );
  } catch (error) {
    return next(new AppError(error.message || "Failed to update product", 500));
  }
};

// PATCH
exports.patchProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return next(new AppError("Product not found", 404));
    }

    return new AppResponse(res, "Product updated partially", updatedProduct);
  } catch (error) {
    return next(new AppError(error.message || "Failed to patch product", 500));
  }
};

// DELETE
exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return next(new AppError("Product not found", 404));
    }

    return new AppResponse(res, "Product deleted successfully", deletedProduct);
  } catch (error) {
    return next(new AppError(error.message || "Failed to delete product", 500));
  }
};

// Alias so route (productController.updatePartialProduct) resolves correctly
exports.updatePartialProduct = exports.patchProduct;

