const Product = require("../models/product.mongo");

const { successResponse } = require("../utils/apiresponses");
const AppError = require("../utils/appError");



exports.createProduct = async (req, res, next) => {

    try {

        const { name, price, category, stocks } = req.body;

        const newProduct = await Product.create({ name, price, category, stocks });

        return successResponse(res, "Product created successfully", newProduct, 201);

    } catch (error) {

        return next(new AppError(error.message || "Failed to create product", 500));

    }

};

