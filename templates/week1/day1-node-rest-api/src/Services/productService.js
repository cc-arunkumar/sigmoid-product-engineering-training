const mongoose = require("mongoose");
const productMongo = require("../models/product.mongo");
const productSQL = require("../models/product.sql");
//Enable both DBsconst
const USE_MONGO = true;
const USE_SQL = true; // Helpers
const isMongoId = (id) => mongoose.Types.ObjectId.isValid(id);
const isSQLId = (id) => !isNaN(id);
// -------------------- GET ALL --------------------
const getAllProducts = async () => {
  let mongoResult = null;
  let sqlResult = null;
  if (USE_MONGO) {
    mongoResult = await productMongo.find();
}
  if (USE_SQL) {
    sqlResult = await productSQL.findAll();
  }
  if (USE_MONGO && USE_SQL) {
    return { mongo: mongoResult || [], sql: sqlResult || [] };
  }
  if (USE_MONGO) return mongoResult;
  if (USE_SQL) return sqlResult;
  return [];
}; // -------------------- GET BY ID --------------------
const getProductById = async (id) => {
  let mongoResult = null;
  let sqlResult = null;
  if (USE_MONGO && isMongoId(id)) {
    mongoResult = await productMongo.findById(id);
  }
  if (USE_SQL && isSQLId(id)) {
    sqlResult = await productSQL.findByPk(id);
  }
  if (USE_MONGO && USE_SQL) {
    if (!mongoResult && !sqlResult) return null;
    return { mongo: mongoResult || null, sql: sqlResult || null };
  }
  if (USE_MONGO) return mongoResult;
  if (USE_SQL) return sqlResult;
  return null;
}; // -------------------- CREATE --------------------
const createProduct = async (data) => {
console.log(data)
  let mongoResult = null;
  let sqlResult = null;
  if (USE_MONGO) {
    mongoResult = await productMongo.create(data);
  }
  if (USE_SQL) {
    sqlResult = await productSQL.create({
      name: data.name,
      price: data.price,
      category: data.category,
      stock: data.stock,
    });
  }
  if (USE_MONGO && USE_SQL) {
    return { mongo: mongoResult, sql: sqlResult };
  }
  if (USE_MONGO) return mongoResult;
  if (USE_SQL) return sqlResult;
  return null;
}; // -------------------- UPDATE (PUT) --------------------
const updateProduct = async (id, data) => {
  let mongoResult = null;
  let sqlResult = null;
  if (USE_MONGO && isMongoId(id)) {
    mongoResult = await productMongo.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
  if (USE_SQL && isSQLId(id)) {
    const product = await productSQL.findByPk(id);
    if (product) {
      await product.update({
        name: data.name,
        price: data.price,
        category: data.category,
        stock: data.stock,
      });
      sqlResult = product;
    }
  }
  if (USE_MONGO && USE_SQL) {
    if (!mongoResult && !sqlResult) return null;
    return { mongo: mongoResult || null, sql: sqlResult || null };
  }
  if (USE_MONGO) return mongoResult;
  if (USE_SQL) return sqlResult;
  return null;
};
const patchProduct = async (id, data) => {
  let mongoResult = null;
  let sqlResult = null;
  if (USE_MONGO && isMongoId(id)) {
    mongoResult = await productMongo.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
  if (USE_SQL && isSQLId(id)) {
    const product = await productSQL.findByPk(id);
    if (product) {
      await product.update(data);
      sqlResult = product;
    }
  }
  if (USE_MONGO && USE_SQL) {
    if (!mongoResult && !sqlResult) return null;
    return { mongo: mongoResult || null, sql: sqlResult || null };
  }
  if (USE_MONGO) return mongoResult;
  if (USE_SQL) return sqlResult;
  return null;
};
// -------------------- DELETE --------------------
const deleteProduct = async (id) => {
  let mongoResult = null;
  let sqlResult = null;
  if (USE_MONGO && isMongoId(id)) {
    mongoResult = await productMongo.findByIdAndDelete(id);
  }
  if (USE_SQL && isSQLId(id)) {
    const product = await productSQL.findByPk(id);
    if (product) {
      await product.destroy();
      sqlResult = product;
    }
  }
  if (USE_MONGO && USE_SQL) {
    if (!mongoResult && !sqlResult) return null;
    return { mongo: mongoResult || null, sql: sqlResult || null };
  }
  if (USE_MONGO) return mongoResult;
  if (USE_SQL) return sqlResult;
  return null;
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};