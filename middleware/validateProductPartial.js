const validateProductPartial = (req, res, next) => {
  const { name, price, category, stock } = req.body;

  if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
    return res.status(400).json({ success: false, message: 'Product name must be a non-empty string' });
  }

  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    return res.status(400).json({ success: false, message: 'Price must be a non-negative number' });
  }

  if (category !== undefined && (typeof category !== 'string' || category.trim() === '')) {
    return res.status(400).json({ success: false, message: 'Category must be a non-empty string' });
  }

  if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
    return res.status(400).json({ success: false, message: 'Stock must be a non-negative number' });
  }

  next();
};

module.exports = validateProductPartial;