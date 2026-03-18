
const express = require("express") ; 

const router = express.Router() ; 

const controller = require("../Controller/controller");

const { validation } = require("../middlewere/logger");
const protect = require("../middlewere/authmiddlewere")
const authorize = require("../middlewere/authorize");
const validatePatchProduct = require("../middlewere/validateProductPartial");

router.get("/api/products" , controller.getAllProducts);
router.get('/api/product/:id' ,  controller.getProductById);


router.post(
    "/api/productpost",
    protect , 
    authorize("user"),
    validation , 
    controller.createProduct
);



router.put("/api/productput" ,
    authorize("admin"),
    controller.updateProduct
);

router.put("/api/productpatch",
    authorize("admin"), 
    validatePatchProduct, 
    controller.patchProduct
);

router.delete("/api/productdelete/:id" , controller.deleteProduct);


module.exports = router
