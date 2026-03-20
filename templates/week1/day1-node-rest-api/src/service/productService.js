// const mongoose = require("mongoose");

// const productMongo = require("../models/product.mongo");

// const productSQL = require("../models/product.sql");


// // Enable both DBs

// const USE_MONGO = true;

// const USE_SQL = true;


// // GET all products

// const getAllProducts = async () => {

// let mongoResult = null;

// let sqlResult = null;


// if (USE_MONGO) {

// mongoResult = await productMongo.find();

// }


// if (USE_SQL) {

// sqlResult = await productSQL.findAll();

// }


// if (USE_MONGO && USE_SQL) {

// return {

// mongo: mongoResult,

// sql: sqlResult

// };

// }


// if (USE_MONGO) return mongoResult;

// if (USE_SQL) return sqlResult;


// return [];

// };


// // GET product by ID

// const getProductById = async (id) => {

// let mongoResult = null;

// let sqlResult = null;


// // Check if valid Mongo ObjectId

// const isMongoId = mongoose.Types.ObjectId.isValid(id);


// // Check if numeric (SQL ID)

// const isSQLId = !isNaN(id);


// // Mongo Query

// if (USE_MONGO && isMongoId) {

// mongoResult = await productMongo.findById(id);

// }


// // SQL Query

// if (USE_SQL && isSQLId) {

// sqlResult = await productSQL.findByPk(id);

// }


// // Return logic

// if (USE_MONGO && USE_SQL) {

// if (!mongoResult && !sqlResult) return null;


// return {

// mongo: mongoResult || null,

// sql: sqlResult || null

// };

// }


// if (USE_MONGO) return mongoResult;

// if (USE_SQL) return sqlResult;


// return null;

// };


// // CREATE product

// const createProduct = async (data) => {

// let mongoResult = null;

// let sqlResult = null;


// if (USE_MONGO) {

// mongoResult = await productMongo.create(data);

// }


// if (USE_SQL) {

// sqlResult = await productSQL.create({

// name: data.name,

// price: data.price,

// category: data.category,

// stock: data.stock

// });

// }


// if (USE_MONGO && USE_SQL) {

// return {

// mongo: mongoResult,

// sql: sqlResult

// };

// }


// if (USE_MONGO) return mongoResult;

// if (USE_SQL) return sqlResult;


// return null;

// };


// // UPDATE product (PUT)

// const updateProduct = async (id, data) => {

// let mongoResult = null;

// let sqlResult = null;
// if (USE_MONGO) {

// mongoResult = await productMongo.findByIdAndUpdate(

// id,

// data,

// { new: true, runValidators: true }

// );

// }


// if (USE_SQL) {

// await productSQL.update(

// {

// name: data.name,

// price: data.price,

// category: data.category,

// stock: data.stock

// },

// {

// where: { id: id }

// }

// );


// sqlResult = await productSQL.findByPk(id);

// }


// if (USE_MONGO && USE_SQL) {

// return {

// mongo: mongoResult,

// sql: sqlResult

// };

// }


// if (USE_MONGO) return mongoResult;

// if (USE_SQL) return sqlResult;


// return null;

// };


// // PATCH product

// const patchProduct = async (id, data) => {

// let mongoResult = null;

// let sqlResult = null;


// if (USE_MONGO) {

// mongoResult = await productMongo.findByIdAndUpdate(

// id,

// data,

// { new: true, runValidators: true }

// );

// }


// if (USE_SQL) {

// await productSQL.update(data, {

// where: { id: id }

// });


// sqlResult = await productSQL.findByPk(id);

// }


// if (USE_MONGO && USE_SQL) {

// return {

// mongo: mongoResult,

// sql: sqlResult

// };

// }


// if (USE_MONGO) return mongoResult;

// if (USE_SQL) return sqlResult;


// return null;

// };


// // DELETE product

// const deleteProduct = async (id) => {

// let mongoResult = null;

// let sqlResult = null;


// if (USE_MONGO) {

// mongoResult = await productMongo.findByIdAndDelete(id);

// }


// if (USE_SQL) {

// sqlResult = await productSQL.destroy({

// where: { id: id }

// });

// }


// if (USE_MONGO && USE_SQL) {

// return {

// mongo: mongoResult,

// sql: sqlResult

// };

// }


// if (USE_MONGO) return mongoResult;

// if (USE_SQL) return sqlResult;


// return null;

// };


// module.exports = {

// getAllProducts,

// getProductById,

// createProduct,

// updateProduct,

// patchProduct,

// deleteProduct

// };
import mongoose from "mongoose";

import productMongo from "../models/product.mongo.js";

import productSQL from "../models/product.sql.js";


// Enable both DBs

const USE_MONGO = true;

const USE_SQL = true;


// Helpers

const isMongoId = (id) => mongoose.Types.ObjectId.isValid(id);

const isSQLId = (id) => !isNaN(id);


// -------------------- GET ALL --------------------

export const getAllProducts = async () => {

    let mongoResult = null;

    let sqlResult = null;


    if (USE_MONGO) {

        mongoResult = await productMongo.find();

    }


    if (USE_SQL) {

        sqlResult = await productSQL.findAll();

    }


    if (USE_MONGO && USE_SQL) {

        return {

            mongo: mongoResult || [],

            sql: sqlResult || []

        };

    }


    if (USE_MONGO) return mongoResult;

    if (USE_SQL) return sqlResult;


    return [];

};


// -------------------- GET BY ID --------------------

export const getProductById = async (id) => {

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


        return {

            mongo: mongoResult || null,

            sql: sqlResult || null

        };

    }


    if (USE_MONGO) return mongoResult;

    if (USE_SQL) return sqlResult;


    return null;

};


// -------------------- CREATE --------------------

export const createProduct = async (data) => {

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

            stock: data.stock

        });

    }


    if (USE_MONGO && USE_SQL) {

        return {

            mongo: mongoResult,

            sql: sqlResult

        };

    }


    if (USE_MONGO) return mongoResult;

    if (USE_SQL) return sqlResult;


    return null;

};


// -------------------- UPDATE (PUT) --------------------

export const updateProduct = async (id, data) => {

    let mongoResult = null;

    let sqlResult = null;


    if (USE_MONGO && isMongoId(id)) {

        mongoResult = await productMongo.findByIdAndUpdate(

            id,

            data,

            { new: true, runValidators: true }

        );

    }


    if (USE_SQL && isSQLId(id)) {

        const product = await productSQL.findByPk(id);

        if (product) {

            await product.update({

                name: data.name,

                price: data.price,

                category: data.category,

                stock: data.stock

            });

            sqlResult = product;

        }

    }


    if (USE_MONGO && USE_SQL) {

        if (!mongoResult && !sqlResult) return null;


        return {

            mongo: mongoResult || null,

            sql: sqlResult || null

        };

    }


    if (USE_MONGO) return mongoResult;

    if (USE_SQL) return sqlResult;


    return null;

};


// -------------------- PATCH --------------------

export const patchProduct = async (id, data) => {

    let mongoResult = null;

    let sqlResult = null;


    if (USE_MONGO && isMongoId(id)) {

        mongoResult = await productMongo.findByIdAndUpdate(

            id,

            data,

            { new: true, runValidators: true }

        );

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


        return {

            mongo: mongoResult || null,

            sql: sqlResult || null

        };

    }


    if (USE_MONGO) return mongoResult;

    if (USE_SQL) return sqlResult;


    return null;

};


// -------------------- DELETE --------------------

export const deleteProduct = async (id) => {

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


        return {

            mongo: mongoResult || null,

            sql: sqlResult || null

        };

    }


    if (USE_MONGO) return mongoResult;

    if (USE_SQL) return sqlResult;


    return null;

};

