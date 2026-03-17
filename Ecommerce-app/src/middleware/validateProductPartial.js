const validateProductPartial = (req, res, next) => {
  const { name, price, category, stock } = req.body;

  // 1. Check Name (Must be string AND not empty)
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Product name must be a non-empty string"
      });
    }
  }

  // 2. Check Price (Must be number AND > 0)
  if (price !== undefined) {
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a number greater than 0"
      });
    }
  }

  // 3. Check Category (Must be string AND not empty)
  if (category !== undefined) {
    if (typeof category !== "string" || category.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category must be a non-empty string"
      });
    }
  }

  // 4. Check Stock (Must be number AND >= 0)
  if (stock !== undefined) {
    if (typeof stock !== "number" || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a number and cannot be negative"
      });
    }
  }

  next();
};

module.exports = validateProductPartial;
