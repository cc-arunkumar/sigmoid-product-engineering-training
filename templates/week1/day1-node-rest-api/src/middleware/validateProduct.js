const { errorResponse } = require("../utils/apiResponse");

const validateProduct = (req, res, next) => {
  if (!req.body) {
    return errorResponse(res, "Request body is required", 400);
  }

  const { name, price, category, stock } = req.body;

  // NAME
  if (typeof name !== "string" || name.trim() === "") {
    return errorResponse(res, "Product name must be a non-empty string", 400);
  }

  // PRICE
  if (typeof price !== "number" || Number.isNaN(price) || price <= 0) {
    return errorResponse(res, "Price must be a number greater than 0", 400);
  }

  // CATEGORY
  if (typeof category !== "string" || category.trim() === "") {
    return errorResponse(res, "Category must be a non-empty string", 400);
  }

  // STOCK
  if (typeof stock !== "number" || Number.isNaN(stock) || stock < 0) {
    return errorResponse(res, "Stock must be a non-negative number", 400);
  }

  next();
};

module.exports = validateProduct;