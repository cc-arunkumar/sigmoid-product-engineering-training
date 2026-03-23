const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct,
} = require("../services/productService");

const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/appError");

// GET all
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await getAllProducts();

        return successResponse(
            res,
            `All products fetched at ${new Date()}`,
            products
        );
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// GET by ID
exports.getProductById = async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id);

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(
            res,
            `Product fetched at ${new Date()}`,
            product
        );
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// CREATE
exports.createProduct = async (req, res, next) => {
    try {
        const product = await createProduct(req.body);

        return successResponse(res, "Product created", product);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// UPDATE (PUT)
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(res, "Product updated", product);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// PATCH
exports.patchProduct = async (req, res, next) => {
    try {
        const product = await patchProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(res, "Product patched", product);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// DELETE
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await deleteProduct(req.params.id);

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(res, "Product deleted", product);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};