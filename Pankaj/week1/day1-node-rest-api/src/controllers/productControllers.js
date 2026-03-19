const Product = require("../models/product.mongo"); 
const AppError = require("../utils/AppError");
const AppResponse = require("../utils/AppResponse");
const { successResponse } = require("../utils/apiResponse");

// GET all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    return new AppResponse(res, "All products fetched successfully", products);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//  GET product by ID
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return new AppResponse(res, "Product fetched successfully", product);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//  CREATE product
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    console.log("Saved to DB:", product);

    return successResponse(res, "Product created successfully", product);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//  UPDATE product (PUT)
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return new AppResponse(res, "Product updated successfully", product);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//  PATCH product
const patchProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return new AppResponse(res, "Product updated partially", product);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//  DELETE product
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return new AppResponse(res, "Product deleted successfully", product);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// EXPORT ALL
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};