const validateProductPartial = (req, res, next) => {
  const { name, price, category, stock } = req.body;

  if (name !== undefined && name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Product name cannot be empty"
    });
  }

  if (price !== undefined && price <= 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be greater than 0"
    });
  }

  if (category !== undefined && category.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Category cannot be empty"
    });
  }

  if (stock !== undefined && stock < 0) {
    return res.status(400).json({
      success: false,
      message: "Stock cannot be negative"
    });
  }

  next();
};

module.exports = validateProductPartial;