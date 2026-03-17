
const express = require("express") ; 

const router = express.Router() ; 

const controller = require("../Controller/controller")
router.get("/products" , controller.getallProducts);
router.get('/product/:id' ,  controller.getproductbyId);
router.post("/productpost" , controller.postproduct)
router.put("/productput" , controller.putproduct);
router.delete("/productdelete/:id" , controller.deleteproduct);


module.exports = router