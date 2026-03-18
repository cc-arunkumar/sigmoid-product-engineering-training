const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");

// GET users
router.get("/api/users", userController.getAllUsers);

// CREATE user
router.post("/api/users", userController.createUser);

module.exports = router;