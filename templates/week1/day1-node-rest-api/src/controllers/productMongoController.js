const Product = require("../models/product.mongo");
const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/apiResponse");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => successResponse(res, "All products fetched successfully", products))
    .catch((err) => next(new AppError(err.message || "Failed to fetch products", 500)));
};

exports.getProductById = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) return next(new AppError("Product not found", 404));
      successResponse(res, "Product fetched successfully", product);
    })
    .catch((err) => next(new AppError(err.message || "Failed to fetch product", 500)));
};

exports.createProduct = (req, res, next) => {
    
    
  const { product_name, product_price, category, Stock } = req.body;

  if (!product_name || !product_price) {
   
    
    return next(new AppError("Product name and price are required", 400));
  }

  Product.create(req.body)
    .then((product) => {
       
        
        successResponse(res, "Product created successfully", product, 201)
    })
    .catch((err) => next(new AppError(err.message || "Failed to create product", 500)));
};

exports.updateProduct = (req, res, next) => {
  const { product_name, product_price, category, Stock } = req.body;

  if (!product_name || !product_price) {
    return next(new AppError("Product name and price are required", 400));
  }

  Product.findByIdAndUpdate(
    req.params.id,
    { product_name, product_price, category, Stock },
    { new: true, runValidators: true }
  )
    .then((product) => {
      if (!product) return next(new AppError("Product not found", 404));
      successResponse(res, "Product updated successfully", product);
    })
    .catch((err) => next(new AppError(err.message || "Failed to update product", 500)));
};

exports.updateProductPartially = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then((product) => {
      if (!product) return next(new AppError("Product not found", 404));
      successResponse(res, "Product partially updated", product);
    })
    .catch((err) => next(new AppError(err.message || "Failed to partially update product", 500)));
};

exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (!product) return next(new AppError("Product not found", 404));
      successResponse(res, "Product deleted successfully", product);
    })
    .catch((err) => next(new AppError(err.message || "Failed to delete product", 500)));
};
