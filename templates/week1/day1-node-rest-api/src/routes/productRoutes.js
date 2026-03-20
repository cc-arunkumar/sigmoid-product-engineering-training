import express from "express";
import { validateProduct } from "../middleware/validateProduct.js";
import { validatePatch } from "../middleware/validatePatch.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { cache } from "../middleware/cache.js";

import {
  getAllProducts,
  getProductById,
  createProduct,
  modifyProduct,
  deleteProduct,
  patchProduct
} from "../controllers/productControllers.js";

import {
  getAllProducts as getAllProductsMongo,
  getProductById as getProductByIdMongo,
  createProduct as createProductMongo,
  updateProduct as updateProductMongo,
  deleteProduct as deleteProductMongo,
  patchProduct as patchProductMongo
} from "../controllers/productMongoController.js";

import createSqlUser from "../controllers/sqlController.js";
import { getAllProductsdb,getProductByIddb,createProductdb,updateProductdb,patchProductdb,deleteProductdb} from "../controllers/dbProductControllers.js";

const router = express.Router();


// router.get("/api/products", cache(60000), getAllProducts);

// router.get("/api/product/:id", cache(60000), getProductById);

// router.post(
//   "/api/products",protect,authorize("user"),validateProduct,createProduct
// );

// router.put(
//   "/api/product/:id",protect,authorize("user"),validateProduct,modifyProduct
// );

// router.delete(
//   "/api/product/:id",protect,authorize("admin"),deleteProduct
// );

// router.patch(
//   "/api/product/:id",protect,authorize("admin"),validatePatch,patchProduct
// );


//MONGODB routes

// router.get("/api/mongo/products",  getAllProductsMongo);

// router.get("/api/mongo/products/:id", getProductByIdMongo);

// router.post("/api/mongo/products",createProductMongo
// );

// router.put("/api/mongo/products/:id",updateProductMongo
// );

// router.delete("/api/mongo/products/:id",deleteProductMongo
// );

// router.patch("/api/mongo/products/:id",patchProductMongo
// );

//SQL & MONGODB ROUTE
router.get("/api/db/products" , getAllProductsdb);
router.get("/api/db/product/:id",getProductByIddb);
router.post("/api/db/products",createProductdb);
router.put("/api/db/product/:id",updateProductdb);
router.patch("/api/db/product/:id",patchProductdb);
router.delete("/api/db/product/:id" ,deleteProductdb);


export default router;