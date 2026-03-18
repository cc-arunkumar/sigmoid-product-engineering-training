const validate = (req, res, next) => {
  if (req.body) {
    const { name, price } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Invalid name",
      });
    }

    if (!price || typeof price !== "number" || price < 0) {
      return res.status(400).json({
        success: false,
        message: "Invlaid price",
      });
    }

    next();
  }
};

module.exports = validate;
