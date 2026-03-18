const { errorResponse } = require("../utils/apiResponse");

const validateProductPartial = (req, res, next) => {
  const { name, price, category, stock } = req.body;

  const errors = [];

  // NAME
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      errors.push("Product name must be a non-empty string");
    }
  }

  // PRICE
  if (price !== undefined) {
    if (typeof price !== "number" || Number.isNaN(price) || price <= 0) {
      errors.push("Price must be a number greater than 0");
    }
  }

  // CATEGORY
  if (category !== undefined) {
    if (typeof category !== "string" || category.trim() === "") {
      errors.push("Category must be a non-empty string");
    }
  }

  // STOCK
  if (stock !== undefined) {
    if (typeof stock !== "number" || Number.isNaN(stock) || stock < 0) {
      errors.push("Stock must be a non-negative number");
    }
  }

  // RETURN ERRORS
  if (errors.length > 0) {
    return errorResponse(res, errors, 400);
  }

  next();
};

module.exports = validateProductPartial;