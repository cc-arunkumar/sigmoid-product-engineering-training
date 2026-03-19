import { AppError } from "../utils/AppError";
const validateProduct = (req, res, next) => {
  const {name,price,category,stock} = req.body;
  if (!name||name.trim()==="") {
    // return res.status(400).json({
    //   success: false,
    //   message: "Product name is required"
    // });
    return next(new AppError("Product name is required", 400));
  }
  if (price ===undefined || price <= 0) {
    // return res.status(400).json({
    //   success: false,
    //   message: "invalid price value"
    // });
    return next(new AppError("Invlaid Price Value", 400));
  }
  if (!category || category.trim() === "") {
    // return res.status(400).json({
    //   success: false,
    //   message: "Category is required"
    // });
    return next(new AppError("Category is required", 400));
  }
  if (stock === undefined || stock < 0) {
    // return res.status(400).json({
    //   success: false,
    //   message: "invalid stock value"
    // });
    return next(new AppError("Invalid Stock Value", 400))
  }
  
  next();
};

module.exports = validateProduct;
