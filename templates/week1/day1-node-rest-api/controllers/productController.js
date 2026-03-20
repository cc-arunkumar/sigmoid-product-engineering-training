const productService = require("../services/productService");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

// -------------------- GET ALL PRODUCTS --------------------
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();

    return successResponse(
      res,
      "All products fetched successfully",
      products
    );
  } catch (error) {
    return next(
      new AppError(error.message || "Failed to fetch products", 500)
    );
  }
};

// -------------------- GET PRODUCT BY ID --------------------
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(
      res,
      "Product fetched successfully",
      product
    );
  } catch (error) {
    return next(new AppError("Invalid product ID", 400));
  }
};

// -------------------- CREATE PRODUCT --------------------
exports.createProduct = async (req, res, next) => {
  try {

    
    const product = await productService.createProduct(req.body);

    return successResponse(
      res,
      "Product created successfully",
      product,
      201
    );
  } catch (error) {
    return next(
      new AppError(error.message || "Failed to create product", 500)
    );
  }
};

// -------------------- UPDATE PRODUCT --------------------
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productService.updateProduct(id, req.body);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(
      res,
      "Product updated successfully",
      product
    );
  } catch (error) {
    return next(
      new AppError(error.message || "Failed to update product", 500)
    );
  }
};

// -------------------- PATCH PRODUCT --------------------
exports.patchProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productService.patchProduct(id, req.body);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(
      res,
      "Product updated partially",
      product
    );
  } catch (error) {
    return next(
      new AppError(error.message || "Failed to patch product", 500)
    );
  }
};

// -------------------- DELETE PRODUCT --------------------
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productService.deleteProduct(id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(
      res,
      "Product deleted successfully",
      product
    );
  } catch (error) {
    return next(
      new AppError(error.message || "Failed to delete product", 500)
    );
  }
};