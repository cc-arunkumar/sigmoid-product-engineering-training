const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const validateUser = require("../middleware/validateUser");
const validateUserPartial = require("../middleware/validateUserPartial");
const errorHandler = require("../middleware/errorHandler");

router.get("/api/users", errorHandler, userController.getAllUsers);
router.get("/api/users/:id", errorHandler, userController.getUserById);
router.post("/api/users", validateUser, userController.createUser);
router.put("/api/users/:id", validateUser, userController.updateUser);
router.delete("/api/users/:id", errorHandler, userController.deleteUser);
router.patch("/api/users/:id", validateUserPartial, userController.patchUser);

module.exports = router;