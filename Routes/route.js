
const express = require("express") ; 

const router = express.Router() ; 

const controller = require("../Controller/controller");
const { validation } = require("../middlewere/logger");

router.get("/api/products" , controller.getAllProducts);
router.get('/api/product/:id' ,  controller.getProductById);


router.post(
    "/api/productpost",
    validation , 
    controller.createProduct
);



router.put("/api/productput" , controller.updateProduct);
router.delete("/api/productdelete/:id" , controller.deleteProduct);


module.exports = router