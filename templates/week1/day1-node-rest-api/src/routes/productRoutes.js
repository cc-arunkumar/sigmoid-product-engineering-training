import express from "express";
import { getAllProducts,getProductById , createProduct , modifyProduct , deleteProduct} from "../controllers/productControllers.js";
const router = express.Router();
router.get("/products" , getAllProducts);
router.get("/product/:id" ,getProductById);
router.post("/products" ,createProduct);
router.put("/products",modifyProduct);
router.delete("/product/:id",deleteProduct);
export default router;