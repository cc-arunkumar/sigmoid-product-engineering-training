const validate = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "No name for product",
    });
  }

  if (!price || price < 0) {
    return res.status(400).json({
      success: false,
      message: "Invlaid price",
    });
  }

  next();
};

module.exports = validate;
