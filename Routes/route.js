
const express = require("express") ; 

const router = express.Router() ; 

const controller = require("../Controller/controller")
router.get("/products" , controller.getallProducts);


module.exports = router