import { getAllProducts,getProductById,createProduct,updateProduct,patchProduct,deleteProduct } from "../service/productService.js";

import { successResponse } from "../utils/apiResponse.js";

import AppError from "../utils/appError.js";


// GET all products

export const getAllProductsdb = async (req, res, next) => {

    try {

        const products = await getAllProducts();

        return successResponse(res, "All products fetched successfully", products);

    } catch (error) {

        return next(new AppError(error.message || "Failed to fetch products", 500));

    }

};


// GET product by ID

export const getProductByIddb = async (req, res, next) => {

    try {

        const { id } = req.params;


        const product = await getProductById(id);


        if (!product) {

            return next(new AppError("Product not found", 404));

        }


        return successResponse(res, "Product fetched successfully", product);

    } catch (error) {

        return next(new AppError("Invalid product ID", 400));

    }

};


// CREATE product

export const createProductdb = async (req, res, next) => {

    try {

        const product = await createProduct(req.body);

        return successResponse(res, "Product created successfully", product, 201);

    } catch (error) {

        return next(new AppError(error.message || "Failed to create product", 500));

    }

};


// UPDATE product

export const updateProductdb = async (req, res, next) => {

    try {

        const { id } = req.params;


        const product = await updateProduct(id, req.body);


        if (!product) {

            return next(new AppError("Product not found", 404));

        }


        return successResponse(res, "Product updated successfully", product);

    } catch (error) {

        return next(new AppError(error.message || "Failed to update product", 500));

    }

};


// PATCH product

export const patchProductdb = async (req, res, next) => {

    try {

        const { id } = req.params;


        const product = await patchProduct(id, req.body);


        if (!product) {

            return next(new AppError("Product not found", 404));

        }


        return successResponse(res, "Product updated partially", product);

    } catch (error) {

        return next(new AppError(error.message || "Failed to patch product", 500));

    }

};


// DELETE product

export const deleteProductdb = async (req, res, next) => {

    try {

        const { id } = req.params;


        const product = await deleteProduct(id);


        if (!product) {

            return next(new AppError("Product not found", 404));

        }


        return successResponse(res, "Product deleted successfully", product);

    } catch (error) {

        return next(new AppError(error.message || "Failed to delete product", 500));

    }

};