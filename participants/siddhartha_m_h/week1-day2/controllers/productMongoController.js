const Product = require('../models/product.mongo');
const AppError = require('../utils/appError');
const { successResponse } = require('../utils/apiResponse');

exports.createProductMongo = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        return successResponse(res, 201, "Product saved in Mongo successfully", { product });
    } catch (error) {
        return next(new AppError(`Error creating product: ${error.message}`, 500));
    }
};