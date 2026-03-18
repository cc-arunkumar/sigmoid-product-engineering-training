
const express = require("express") ; 

const router = express.Router() ; 

const controller = require("../Controller/controller");
const { validation } = require("../middlewere/logger");
const validatePatchProduct = require("../middlewere/validateProductPartial");

router.get("/api/products" , controller.getAllProducts);
router.get('/api/product/:id' ,  controller.getProductById);


router.post(
    "/api/productpost",
    validation , 
    controller.createProduct
);



router.put("/api/productput" , controller.updateProduct);

router.put("/api/productpatch", 
    validatePatchProduct, 
    controller.patchProduct
);

router.delete("/api/productdelete/:id" , controller.deleteProduct);


module.exports = router
