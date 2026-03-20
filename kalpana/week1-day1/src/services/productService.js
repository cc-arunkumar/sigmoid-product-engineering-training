const mongoose = require("mongoose");
const productMongo = require("../models/product.mongo");
const productSQL = require("../models/product.sql");

// Enable both DBs
const USE_MONGO = true;
const USE_SQL = true;

// Helpers
const isMongoId = (id) => mongoose.Types.ObjectId.isValid(id);
const isSQLId = (id) => !isNaN(id);


// -------------------- GET ALL --------------------
const getAllProducts = async () => {
    let mongoResult = [];
    let sqlResult = [];

    if (USE_MONGO) {
        mongoResult = await productMongo.find();
    }

    if (USE_SQL) {
        try {
            sqlResult = await productSQL.findAll();
        } catch (err) {
            console.error("SQL GET ALL ERROR:", err.message);
        }
    }

    return { mongo: mongoResult, sql: sqlResult };
};

// -------------------- GET BY ID --------------------
const getProductById = async (id) => {
    let mongoResult = null;
    let sqlResult = null;

    if (USE_MONGO && isMongoId(id)) {
        mongoResult = await productMongo.findById(id);
    }

    if (USE_SQL && isSQLId(id)) {
        try {
            sqlResult = await productSQL.findByPk(id);
        } catch (err) {
            console.error("SQL GET BY ID ERROR:", err.message);
        }
    }

    return { mongo: mongoResult, sql: sqlResult };
};

// -------------------- CREATE --------------------
const createProduct = async (data) => {
    let mongoResult = null;
    let sqlResult = null;

    if (USE_MONGO) {
        mongoResult = await productMongo.create(data);
    }

    if (USE_SQL) {
        try {
            sqlResult = await productSQL.create({
                name: data.name,
                price: data.price,
                category: data.category,
                stock: data.stock,
            });
        } catch (err) {
            console.error("SQL CREATE ERROR:", err.message);
        }
    }

    return { mongo: mongoResult, sql: sqlResult };
};

// -------------------- UPDATE --------------------
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
        try {
            const product = await productSQL.findByPk(id);
            if (product) {
                await product.update(data);
                sqlResult = product;
            }
        } catch (err) {
            console.error("SQL UPDATE ERROR:", err.message);
        }
    }

    return { mongo: mongoResult, sql: sqlResult };
};

// -------------------- PATCH --------------------
const patchProduct = async (id, data) => {
    // Same as updateProduct but can allow partial updates
    return updateProduct(id, data);
};

// -------------------- DELETE --------------------
const deleteProduct = async (id) => {
    let mongoResult = null;
    let sqlResult = null;

    if (USE_MONGO && isMongoId(id)) {
        mongoResult = await productMongo.findByIdAndDelete(id);
    }

    if (USE_SQL && isSQLId(id)) {
        try {
            const product = await productSQL.findByPk(id);
            if (product) {
                await product.destroy();
                sqlResult = product;
            }
        } catch (err) {
            console.error("SQL DELETE ERROR:", err.message);
        }
    }

    return { mongo: mongoResult, sql: sqlResult };
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct,
};