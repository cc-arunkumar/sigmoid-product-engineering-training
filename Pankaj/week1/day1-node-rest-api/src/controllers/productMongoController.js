// const Product = require("../models/product.mongo");
// const AppError = require("../utils/AppError");
// const AppResponse = require("../utils/AppResponse");
// const { successResponse } = require("../utils/apiResponse");

// //  GET all products
// exports.getAllProducts = async (req, res, next) => {
//   try {
//     const products = await Product.find();
//     return new AppResponse(res, "Products fetched successfully", products);
//   } catch (error) {
//     return next(new AppError(error.message, 500));
//   }
// };

// //  CREATE product
// exports.createProduct = async (req, res, next) => {
//   try {
//     const product = await Product.create(req.body);
//     return successResponse(res, "Product saved in MongoDB", product);
//   } catch (error) {
//     return next(new AppError(error.message, 500));
//   }
// };

// //  UPDATE (PUT)
// exports.updateProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!product) {
//       return next(new AppError("Product not found", 404));
//     }

//     return new AppResponse(res, "Product updated", product);
//   } catch (error) {
//     return next(new AppError(error.message, 500));
//   }
// };

// //  PATCH
// exports.patchProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!product) {
//       return next(new AppError("Product not found", 404));
//     }

//     return new AppResponse(res, "Product partially updated", product);
//   } catch (error) {
//     return next(new AppError(error.message, 500));
//   }
// };

// //  DELETE
// exports.deleteProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);

//     if (!product) {
//       return next(new AppError("Product not found", 404));
//     }

//     return new AppResponse(res, "Product deleted", product);
//   } catch (error) {
//     return next(new AppError(error.message, 500));
//   }
// };