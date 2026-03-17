const express = require("express");
const router = express.Router();

const {
  getAllUsers,
} = require("../controllers/usersController");

// Routes
router.get("/", getAllUsers);

module.exports = router;