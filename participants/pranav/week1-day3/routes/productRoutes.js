const express =require("express")

const router= express.Router()

const productController=require("../controllers/productControllers")
const validateProduct = require("../middleware/validateProduct")
const validatePatchProduct = require("../middleware/validatePatchProduct")
const protect = require("../middleware/authMiddleware")
const authorize = require("../middleware/authorize")


router.get("/",productController.getAllProducts)
      .get("/:id",productController.getProductById)
      .post("/",protect,authorize("user"),validateProduct,productController.createProduct)
      .put("/:id",validateProduct,authorize("user"),productController.updateProduct)
      .patch("/:id",protect,validatePatchProduct, authorize("admin"),productController.patchProduct)
      .delete("/:id",protect,authorize("admin"),productController.deleteProduct)


module.exports= router



