import Product from "../models/product.mongo.js";
import { successResponse } from "../utils/apiResponse.js";
import AppError from "../utils/appError.js";

// GET all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    return successResponse(res, "All products fetched successfully", products);
  } catch (error) {
    return next(new AppError(error.message || "Failed to fetch products", 500));
  }
};

// GET product by ID
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(res, "Product fetched successfully", product);
  } catch (error) {
    return next(new AppError("Invalid product ID", 400));
  }
};

// CREATE product
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
      stock,
    });

    return successResponse(res, "Product created successfully", product);
  } catch (error) {
    return next(new AppError(error.message || "Failed to create product", 500));
  }
};

// UPDATE product (PUT)
export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, stock },
      { new: true, runValidators: true }
    );

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(res, "Product updated successfully", product);
  } catch (error) {
    return next(new AppError(error.message || "Failed to update product", 500));
  }
};

// PATCH product
export const patchProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(res, "Product updated partially", product);
  } catch (error) {
    return next(new AppError(error.message || "Failed to patch product", 500));
  }
};

// DELETE product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(res, "Product deleted successfully", product);
  } catch (error) {
    return next(new AppError(error.message || "Failed to delete product", 500));
  }
};