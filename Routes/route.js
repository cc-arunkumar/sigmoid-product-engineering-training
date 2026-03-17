
const express = require("express") ; 

const router = express.Router() ; 

const controller = require("../Controller/controller");
const { validation } = require("../middlewere/logger");

router.get("/api/products" , controller.getallProducts);
router.get('/api/product/:id' ,  controller.getproductbyId);


router.post(
    "/api/productpost",
    validation , 
    controller.postproduct
);



router.put("/api/productput" , controller.putproduct);
router.delete("/api/productdelete/:id" , controller.deleteproduct);


module.exports = router