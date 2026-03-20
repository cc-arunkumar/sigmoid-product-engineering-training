const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/apiResponse");
const productService = require("../services/productService");

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res, next) => {
  try {
    const data = await productService.getAllProducts();
    return successResponse(res, "All products fetched", data);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

// GET PRODUCT BY ID
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productService.getProductById(id);

    if (!data) return next(new AppError("Product not found", 404));

    return successResponse(res, "Product fetched", data);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

// CREATE PRODUCT
exports.createProduct = async (req, res, next) => {
  try {
    const data = await productService.createProduct(req.body);
    return successResponse(res, "Product created", data);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productService.updateProduct(id, req.body);

    if (!data) return next(new AppError("Product not found", 404));

    return successResponse(res, "Product updated", data);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

// PATCH PRODUCT
exports.patchProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productService.patchProduct(id, req.body);

    if (!data) return next(new AppError("Product not found", 404));

    return successResponse(res, "Product patched", data);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productService.deleteProduct(id);

    if (!data) return next(new AppError("Product not found", 404));

    return successResponse(res, "Product deleted", data);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};