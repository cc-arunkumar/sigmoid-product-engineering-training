const ProductSQL = require("../models/product.sql");
const ProductMongo = require("../models/product.mongo");

// -------------------- GET ALL --------------------
const getAllProducts = async () => {
  const sqlData = await ProductSQL.findAll();
  const mongoData = await ProductMongo.find();

  return {
    sql: sqlData,
    mongo: mongoData
  };
};

// -------------------- GET BY ID --------------------
const getProductById = async (id) => {
  const sqlData = await ProductSQL.findByPk(id);

  // Mongo uses _id, so this may differ
  let mongoData = null;
  if (id.length === 24) {
    mongoData = await ProductMongo.findById(id);
  }

  return {
    sql: sqlData,
    mongo: mongoData
  };
};

// -------------------- CREATE --------------------
const createProduct = async (data) => {
  const sqlData = await ProductSQL.create({
    name: data.name,
    price: data.price,
    category: data.category,
    stock: data.stock
  });

  const mongoData = await ProductMongo.create(data);

  return {
    sql: sqlData,
    mongo: mongoData
  };
};

// -------------------- UPDATE --------------------
const updateProduct = async (id, data) => {
  let sqlData = null;
  let mongoData = null;

  // SQL
  const productSQL = await ProductSQL.findByPk(id);
  if (productSQL) {
    await productSQL.update(data);
    sqlData = productSQL;
  }

  // Mongo (only if valid ObjectId)
  if (id.length === 24) {
    mongoData = await ProductMongo.findByIdAndUpdate(id, data, {
      new: true
    });
  }

  return { sql: sqlData, mongo: mongoData };
};

// -------------------- DELETE --------------------
const deleteProduct = async (id) => {
  let sqlData = null;
  let mongoData = null;

  // SQL
  const productSQL = await ProductSQL.findByPk(id);
  if (productSQL) {
    await productSQL.destroy();
    sqlData = productSQL;
  }

  // Mongo
  if (id.length === 24) {
    mongoData = await ProductMongo.findByIdAndDelete(id);
  }

  return { sql: sqlData, mongo: mongoData };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};