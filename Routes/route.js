
const express = require("express") ; 

const router = express.Router() ; 

const controller = require("../Controller/controller")
router.get("/products" , controller.getallProducts);
router.get('/product/:id' ,  controller.getproductbyId);

module.exports = router