const validateProduct = (req, res, next) => {
  const {name,price,category,stock} = req.body;
  if (!name||name.trim()==="") {
    return res.status(400).json({
      success: false,
      message: "Product name is required"
    });
  }
  if (price ===undefined || price <= 0) {
    return res.status(400).json({
      success: false,
      message: "invalid price value"
    });
  }
  if (!category || category.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Category is required"
    });
  }
  if (stock === undefined || stock < 0) {
    return res.status(400).json({
      success: false,
      message: "invalid stock value"
    });
  }
  
  next();
};

module.exports = validateProduct;
