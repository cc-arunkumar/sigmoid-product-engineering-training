const Product = require("../models/product.mongo");
const AppError = require("../utils/AppError");
const { sucessResponse, successResponse } = require("../utils/apiResponse");

exports.createProductMongo = async (req, resizeBy, next) => {
    try{
        const product = await Product.create(req.body);
        return successResponse(resizeBy, "Product saved in MongoDB", product);
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};