const express =require("express")

const router= express.Router()

const productController=require("../controllers/productControllers")


router.get("/",productController.getAllProducts)
      .get("/:id",productController.getProductById)
       .post("/",productController.createProduct)
       .put("/:id",productController.updateProducts)
       .patch("/:id", productController.patchProduct)
       .delete("/:id",productController.deleteById)


module.exports= router
 