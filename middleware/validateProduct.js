const validateProduct = (req, res, next) => {
  const { name, price, category, stock } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'Product name is required' });
  }

  if (price === undefined || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ success: false, message: 'Price must be a non-negative number' });
  }

  if (!category || category.trim() === '') {
    return res.status(400).json({ success: false, message: 'Category is required' });
  }

  if (stock === undefined || typeof stock !== 'number' || stock < 0) {
    return res.status(400).json({ success: false, message: 'Stock must be a non-negative number' });
  }

  next();
};

module.exports = validateProduct;