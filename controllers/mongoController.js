const Product = require('../models/product.model');
const AppError = require('../utils/appError');
const {successResponse} = require('../utils/apiResponse');

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return successResponse(res, 'All products fetched successfully', products);
    } catch (error) {
        return next(new AppError('Failed to fetch products', 500));
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(new AppError('Product not found', 404));
        return successResponse(res, 'Product fetched successfully', product);
    } catch (error) {
        return next(new AppError('Failed to fetch product', 500));
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        return successResponse(res, 'Product created successfully', product);
    } catch (error) {
        return next(new AppError('Failed to create product', 500));
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return next(new AppError('Product not found', 404));
        return successResponse(res, 'Product updated successfully', product);
    } catch (error) {
        return next(new AppError('Failed to update product', 500));
    }
};

exports.patchProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return next(new AppError('Product not found', 404));
        return successResponse(res, 'Product partially updated', product);
    } catch (error) {
        return next(new AppError('Failed to patch product', 500));
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return next(new AppError('Product not found', 404));
        return successResponse(res, 'Product deleted successfully', product);
    } catch (error) {
        return next(new AppError('Failed to delete product', 500));
    }
};