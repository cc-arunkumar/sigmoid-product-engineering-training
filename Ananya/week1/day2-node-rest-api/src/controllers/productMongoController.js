const product=require("../models/productMongoModel");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

exports.createProduct = async (req, res, next) => {

try {
    

const newProduct = await product.create({ req.body });

return successResponse(res, "Product created successfully", newProduct);

}  catch (error) {

return next(new AppError(error.message || "Failed to create product", 500));

}

};

