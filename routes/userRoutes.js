const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

const validateUser = require("../middleware/validateUser");
const validateUserPartial = require("../middleware/validateUserPartial");

router.get("/api/users", userController.getUsers)

router.get("/api/user/:id", userController.getUserById)

router.post("/api/user", validateUser, userController.createUser)

router.put("/api/user/:id", validateUser, userController.updateUser)

router.delete("/api/user/:id", userController.deleteUser)

router.patch("/api/user/:id", validateUserPartial, userController.updatePartialUser)

module.exports = router;