const AppError=require("../utils/AppError")
const validateProductPartial = (req, res, next) => {
  const { name, price, category, stock } = req.body;

  if (name !== undefined && name.trim() === "") {
    // return res.status(400).json({
    //   success: false,
    //   message: "Product name cannot be empty"
    // });
    return next(new AppError("Product name cannto be empty", 400));
  }

  if (price !== undefined && price <= 0) {
    // return res.status(400).json({
    //   success: false,
    //   message: "Price must be greater than 0"
    // });
    return next(new AppError("Price must be greater than 0", 400));
  }

  if (category !== undefined && category.trim() === "") {
    // return res.status(400).json({
    //   success: false,
    //   message: "Category cannot be empty"
    // });
    return next(new AppError("Category cannot be empty", 400));
  }

  if (stock !== undefined && stock < 0) {
    // return res.status(400).json({
    //   success: false,
    //   message: "Stock cannot be negative"
    // });
    return next(new AppError("Stock cannot be negative in value", 400));
  }

  next();
};

module.exports = validateProductPartial;
