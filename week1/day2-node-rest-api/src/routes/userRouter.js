const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const validateUser = require("../middleware/validateUser");
const validateUserPartial = require("../middleware/validateUserPartial");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.get("/api/users", protect, authorize("user", "admin"), userController.getAllUsers);
router.get("/api/users/:id", protect, authorize("user", "admin"), userController.getUserById);
router.post("/api/users", protect, authorize("admin"), validateUser, userController.createUser);
router.put("/api/users/:id", protect, authorize("admin"), validateUser, userController.updateUser);
router.delete("/api/users/:id", protect, authorize("admin"), userController.deleteUser);
router.patch("/api/users/:id", protect, authorize("admin"), validateUserPartial, userController.patchUser);

module.exports = router;