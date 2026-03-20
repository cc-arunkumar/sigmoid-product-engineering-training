const Product = require("../models/product");
const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/apiresponce");


exports.createProductMongo  = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        return successResponse(res, "Product saved in MongoDB", product);
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};