const service = require("../services/productService");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

exports.getAllProducts = async (req, res, next) => {
  const data = await service.getAllProducts();
  return successResponse(res, "Products fetched", data);
};

exports.getProductById = async (req, res, next) => {
  const data = await service.getProductById(req.params.id);
  if (!data) return next(new AppError("Not found", 404));
  return successResponse(res, "Product fetched", data);
};

exports.createProduct = async (req, res, next) => {
  const data = await service.createProduct(req.body);
  return successResponse(res, "Created", data, 201);
};

exports.updateProduct = async (req, res, next) => {
  const data = await service.updateProduct(req.params.id, req.body);
  if (!data) return next(new AppError("Not found", 404));
  return successResponse(res, "Updated", data);
};

exports.deleteProduct = async (req, res, next) => {
  const data = await service.deleteProduct(req.params.id);
  if (!data) return next(new AppError("Not found", 404));
  return successResponse(res, "Deleted", data);
};