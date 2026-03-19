const { products } = require("../data/products");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/appError");
const Product = require("../models/productModel");

// GET all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    return successResponse(res, "All products fetched successfully", products);
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

    return successResponse(res, "Product fetched successfully", product);
  } catch (error) {
    return next(new AppError("Invalid ID or failed to fetch product", 500));
  }
};

// CREATE product (POST)
exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);

    return successResponse(res, "Product created successfully", newProduct);
  } catch (error) {
    return next(new AppError(error.message || "Failed to create product", 500));
  }
};

// UPDATE product (PUT)
exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return updated doc
        runValidators: true, // apply schema validation
      },
    );

    if (!updatedProduct) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(res, "Product updated successfully", updatedProduct);
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
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(res, "Product updated partially", updatedProduct);
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

    return successResponse(res, "Product deleted successfully", deletedProduct);
  } catch (error) {
    return next(new AppError(error.message || "Failed to delete product", 500));
  }
};
