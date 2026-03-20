const ProductSQL = require("../models/productModel.sql");
const Product = require("../models/productModel");

// TOGGLE DATABASE HERE
const USE_MONGO = 0;
const USE_SQL = !USE_MONGO;

// Helper to pick model
const getModel = () => {
  if (USE_MONGO) return Product;
  if (USE_SQL) return ProductSQL;
};

// GET ALL
exports.getAllProducts = async () => {
  const Model = getModel();

  if (USE_MONGO) {
    return await Model.find();
  }

  if (USE_SQL) {
    return await Model.findAll();
  }
};

// GET BY ID
exports.getProductById = async (id) => {
  const Model = getModel();

  if (USE_MONGO) {
    return await Model.findById(id);
  }

  if (USE_SQL) {
    return await Model.findByPk(id);
  }
};

// CREATE
exports.createProduct = async (data) => {
  const Model = getModel();

  if (USE_MONGO) {
    return await Model.create(data);
  }

  if (USE_SQL) {
    return await Model.create(data);
  }
};

// UPDATE (PUT - replace)
exports.updateProduct = async (id, data) => {
  const Model = getModel();

  if (USE_MONGO) {
    return await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
  }

  if (USE_SQL) {
    const product = await Model.findByPk(id);
    if (!product) return null;

    await product.update(data);
    return product;
  }
};

// PATCH
exports.patchProduct = async (id, data) => {
  const Model = getModel();

  if (USE_MONGO) {
    return await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  if (USE_SQL) {
    const product = await Model.findByPk(id);
    if (!product) return null;

    await product.update(data);
    return product;
  }
};

// DELETE
exports.deleteProduct = async (id) => {
  const Model = getModel();

  if (USE_MONGO) {
    return await Model.findByIdAndDelete(id);
  }

  if (USE_SQL) {
    const product = await Model.findByPk(id);
    if (!product) return null;

    await product.destroy();
    return product;
  }
};
