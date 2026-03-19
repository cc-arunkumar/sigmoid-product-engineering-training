const Product = require("../models/product.mongo")

const AppError = require("../utils/appError");

const { successResponse } = require("../utils/apiResponse");

exports.createProductMongo = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        return successResponse(res, "Product send in MongoDb", product);

    }
    catch (error) {
        return next(new AppError(error.message, 500))
    }
}