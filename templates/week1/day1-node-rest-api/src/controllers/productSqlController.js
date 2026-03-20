const ProductSQL = require("../models/product.sql"); // your Sequelize model
const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/apiResponse");

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductSQL.findAll();
    successResponse(res, "All products fetched successfully", products);
  } catch (err) {
    next(new AppError(err.message || "Failed to fetch products", 500));
  }
};

// Get a product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await ProductSQL.findByPk(req.params.id);
    if (!product) return next(new AppError("Product not found", 404));
    successResponse(res, "Product fetched successfully", product);
  } catch (err) {
    next(new AppError(err.message || "Failed to fetch product", 500));
  }
};

// Create a product
exports.createProduct = async (req, res, next) => {
  const { name, price, category, stock } = req.body;

  if (!name || !price) {
    return next(new AppError("Product name and price are required", 400));
  }

  try {
    const product = await ProductSQL.create({ name, price, category, stock });
    successResponse(res, "Product created successfully", product, 201);
  } catch (err) {
    next(new AppError(err.message || "Failed to create product", 500));
  }
};

// Update a product completely
exports.updateProduct = async (req, res, next) => {
  const { name, price, category, stock } = req.body;

  if (!name || !price) {
    return next(new AppError("Product name and price are required", 400));
  }

  try {
    const [updatedRows, [updatedProduct]] = await ProductSQL.update(
      { name, price, category, stock },
      { where: { id: req.params.id }, returning: true }
    );

    if (updatedRows === 0) return next(new AppError("Product not found", 404));

    successResponse(res, "Product updated successfully", updatedProduct);
  } catch (err) {
    next(new AppError(err.message || "Failed to update product", 500));
  }
};

// Update product partially
exports.updateProductPartially = async (req, res, next) => {
  try {
    const [updatedRows, [updatedProduct]] = await ProductSQL.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });

    if (updatedRows === 0) return next(new AppError("Product not found", 404));

    successResponse(res, "Product partially updated", updatedProduct);
  } catch (err) {
    next(new AppError(err.message || "Failed to partially update product", 500));
  }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedRows = await ProductSQL.destroy({ where: { id: req.params.id } });
    if (deletedRows === 0) return next(new AppError("Product not found", 404));
    successResponse(res, "Product deleted successfully", {});
  } catch (err) {
    next(new AppError(err.message || "Failed to delete product", 500));
  }
};