const express =require("express")

const router= express.Router()

const productController=require("../controllers/productControllers")
const validateProduct = require("../middleware/validateProduct")
const validatePatchProduct = require("../middleware/validatePatchProduct")


router.get("/",productController.getAllProducts)
      .get("/:id",productController.getProductById)
       .post("/",validateProduct,productController.createProduct)
       .put("/:id",validateProduct,productController.updateProducts)
       .patch("/:id",validatePatchProduct, productController.patchProduct)
       .delete("/:id",productController.deleteById)


module.exports= router
 