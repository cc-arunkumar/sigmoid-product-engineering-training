const Product= require("../models/productModel");
const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/apiResponse");

exports.createProductMongo = async (req, res, next) => {
    try {
        const product= await Product.create(req.body);
        return successResponse(res, "Product saved in MongoDB.", product);
    } catch (error) {
        return next(new AppError(error.message || "Failed to create product", 500));
    }
};