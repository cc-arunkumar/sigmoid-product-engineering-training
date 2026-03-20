const { errorResponse } = require("../utils/apiResponse");

const validateProduct = (req, res, next) => {
  const { name, price, category, stock } = req.body;

  if (!name || typeof name !== "string") {
    return errorResponse(res, "Invalid name", 400);
  }

  if (!price || typeof price !== "number") {
    return errorResponse(res, "Invalid price", 400);
  }

  if (!category || typeof category !== "string") {
    return errorResponse(res, "Invalid category", 400);
  }

  if (typeof stock !== "number") {
    return errorResponse(res, "Invalid stock", 400);
  }

  next();
};

module.exports = validateProduct;