// const products=require("../data/products");

// const {successresponse}=require("../utils/apiresponses");


// exports.getallproducts=(req, res)=>{
//     // res.json(products);

//     return successresponse(res, "Product displays", products, 200);
// } ;



// exports.getproductbyId=(req,res , next)=>{
//     const productId=parseInt(req.params.id);
//     const product=products.find(p=>p.id===productId)

//     if(!product){
//         const error = new Error("ID not found");
//         error.statusCode = 404;
//         next(error);
//     }
//     return successresponse(res, "Product get by id ", products, 200);
// }

// exports.createproducts=(req,res)=>{
//     // const newProduct = { id:108, name:"tablet", price:40000 };

//     const {name , price, category , stocks}=req.body

//     const newProduct={
//         id:100+products.length+1,
//         name:name,
//         price:price,
//         category:category,
//         stocks:stocks
//     }

//     products.push(newProduct)

//    return successresponse(
//         res,
//         "Product created successfully",
//         newProduct,
//         201
//     );

// }


// exports.updateProduct=(req,res, next)=>{
//     const productId=parseInt(req.params.id);
//     const product=products.find(p=>p.id===productId)

//     if(!product){
//         const error = new Error("ID not found");
//         error.statusCode = 404;
//         next(error);

//     }   

//     const {name , price, category , stocks}=req.body

//         product.name=name,
//         product.price=price,
//         product.category=category,
//         product.stocks=stocks

//      return successresponse(res, "Product updated successfully", product, 200);
// }


// exports.DeletebyId=(req,res, next)=>{
//     const productId=req.params.id*1;
//     const productIndex=products.findIndex(p=>p.id===productId)

//     if(!productIndex ){
//         const error = new Error("ID not found");
//         error.statusCode = 404;
//         next(error);
//     }


//     const deletedProduct = products.splice(productIndex, 1)[0];


//     return successresponse(res, "Product deleted successfully", deletedProduct, 200);
// }

// exports.updatePartialProduct=(req,res, next)=>{
//     const productId=parseInt(req.params.id);
//     const product=products.find(p=>p.id===productId)

//     if(!product){
//          const error = new Error("ID not found");
//         error.statusCode = 404;
//         next(error);

//     }   

//     const {name , price, category , stocks}=req.body
//         if(name!=undefined) product.name=name;
//         if(price!=undefined)product.price=price;
//         if(category!=undefined)product.category=category;
//         if(stocks!=undefined)product.stocks=stocks;

//       return successresponse(res, "Product updated successfully", product, 200);
// }


const products = require("../data/products");

const { successResponse } = require("../utils/apiresponses");
const AppError = require("../utils/appError");


// GET all products

exports.getallproducts = (req, res, next) => {

    try {

        return successResponse(res, "Product displays", products, 200);

    } catch (error) {

        return next( new AppError(error.message || "failed to fetch products" , 500));
    }

};


// GET product by ID

exports.getproductbyId = (req, res, next) => {

    try {

        const productId = (req.params.id) * 1;

        const product = products.find(p => p.id === productId);


        if (!product) {

           return next( new AppError(error.message || "failed to fetch products" , 500));

        }


        return successResponse(res, "Product get by id ", product, 200);

    } catch (error) {

        return next({

            statusCode: 500,

            message: error.message || "Failed to fetch product"

        });

    }

};


// CREATE product (POST)

exports.createproducts = (req, res, next) => {

    try {

        const { name, price, category, stocks } = req.body;


        const newProduct = {

            id: products.length + 1,

            name,

            price,

            category,

            stocks

        };


        products.push(newProduct);


        return successResponse(
        res,
        "Product created successfully",
    newProduct,
         201
    );

    } catch (error) {

       return next( new AppError(error.message || "failed to create products" , 500));

    }

};


// UPDATE product (PUT)

exports.updateProduct = (req, res, next) => {

    try {

        const productId = (req.params.id) * 1;

        const index = products.findIndex(p => p.id === productId);


        if (index === -1) {

            return next({

                statusCode: 404,

                message: "Product not found"

            });

        }


        const { name, price, category, stock } = req.body;


        products[index] = {

            id: productId,

            name,

            price,

            category,

            stock

        };


        return successResponse(res, "Product updated successfully", index, 200);

    } catch (error) {

      return next( new AppError(error.message || "failed to update products" , 500));

    }

};


// PATCH

exports.updatePartialProduct = (req, res, next) => {

    try {

        const productId = (req.params.id) * 1;

        const product = products.find(p => p.id === productId);


        if (!product) {

            return next({

                statusCode: 404,

                message: "Product not found"

            });

        }


        Object.assign(product, req.body);


        return successResponse(res, "Product updated successfully", product, 200);

    } catch (error) {

       return next( new AppError(error.message || "failed to patch products" , 500));

    }

};


// DELETE

exports.DeletebyId = (req, res, next) => {

    try {

        const productId = (req.params.id) * 1;

        const index = products.findIndex(p => p.id === productId);


        if (index === -1) {

            return next({

                statusCode: 404,

                message: "Product not found"

            });

        }


        const deleted = products.splice(index, 1);


        return successResponse(res, "Product deleted successfully", deleted, 200);

    } catch (error) {

       return next( new AppError(error.message || "failed to delete products" , 500));

    }

};