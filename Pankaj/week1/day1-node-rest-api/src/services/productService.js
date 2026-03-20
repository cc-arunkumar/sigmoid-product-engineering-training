const mongoose = require("mongoose");
const productMongo = require("../models/product.mongo");
const productSQL = require("../models/product.sql");

const USE_MONGO = false;
const USE_SQL = true;

const isMongoId = (id) => mongoose.Types.ObjectId.isValid(id);
const isSQLId = (id) => !isNaN(id);

// GET ALL
const getAllProducts = async () => {
  if (USE_SQL) return await productSQL.findAll();
  if (USE_MONGO) return await productMongo.find();
  return [];
};

// GET BY ID
const getProductById = async (id) => {
  if (USE_SQL && isSQLId(id)) return await productSQL.findByPk(id);
  if (USE_MONGO && isMongoId(id)) return await productMongo.findById(id);
  return null;
};

// CREATE
const createProduct = async (data) => {
  if (USE_SQL) return await productSQL.create(data);
  if (USE_MONGO) return await productMongo.create(data);
  return null;
};

// UPDATE
const updateProduct = async (id, data) => {
  if (USE_SQL && isSQLId(id)) {
    const product = await productSQL.findByPk(id);
    if (!product) return null;
    await product.update(data);
    return product;
  }

  if (USE_MONGO && isMongoId(id)) {
    return await productMongo.findByIdAndUpdate(id, data, { new: true });
  }

  return null;
};

// PATCH
const patchProduct = async (id, data) => {
  return updateProduct(id, data);
};

// DELETE
const deleteProduct = async (id) => {
  if (USE_SQL && isSQLId(id)) {
    const product = await productSQL.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return product;
  }

  if (USE_MONGO && isMongoId(id)) {
    return await productMongo.findByIdAndDelete(id);
  }

  return null;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};