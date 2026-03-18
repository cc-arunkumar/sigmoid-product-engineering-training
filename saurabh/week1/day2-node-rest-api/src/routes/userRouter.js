const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const validateUser = require("../middleware/validateUser");
const validateUserPartial = require("../middleware/validateUserPartial");

router.get("/api/users", userController.getAllUsers);
router.get("/api/users/:id", userController.getUserById);
router.post("/api/users", validateUser, userController.createUser);
router.put("/api/users/:id", validateUser, userController.updateUser);
router.delete("/api/users/:id", userController.deleteUser);
router.patch("/api/users/:id", validateUserPartial, userController.patchUser);

module.exports = router;