
const express = require("express");

const router = express.Router();

const controller = require("../Controller/controller");

const { validation } = require("../middlewere/logger");
const protect = require("../middlewere/authmiddlewere")
const validatePatchProduct = require("../middlewere/validateProductPartial");

const authorize = require("../middlewere/authorize");

router.get("/api/products", controller.getAllProducts);
router.get('/api/product/:id', controller.getProductById);


// router.post(
//     "/api/productpost",
//     protect,
//     authorize("admin"),
//     validation,
//     controller.createProduct
// );

router.post(
    "/api/productpost",
    controller.createProduct
);

router.put("/api/productput",
    validation ,
    protect,
    authorize("admin"),
    controller.updateProduct);

router.patch("/api/productpatch",
    validatePatchProduct,
    protect , 
    authorize("admin"),
    controller.patchProduct
);

router.delete("/api/productdelete/:id",
    authorize("admin"),
    protect , 
    controller.deleteProduct
);


module.exports = router