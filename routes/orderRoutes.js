const expfess=require('express');
const router=expfess.Router();
const orderController=require("../controllers/orderController")

const validateOrder=require("../middleware/validateOrder");
const validateOrderPartial = require("../middleware/validateOrderPartial");

router.get("/api/orders",orderController.getOrders)

router.get("/api/order/:id",orderController.getOrderById)

router.post("/api/order",validateOrder,orderController.createOrder)

router.put("/api/order/:id",validateOrder,orderController.updateOrder)

router.delete("/api/order/:id",orderController.deleteOrder)

router.patch("/api/order/:id",validateOrderPartial,orderController.updatePartialOrder)

module.exports=router;