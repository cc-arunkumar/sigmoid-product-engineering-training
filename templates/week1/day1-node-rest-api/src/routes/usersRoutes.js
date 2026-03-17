const express = require("express");
const router = express.Router();

const {
  getAllUsers,
} = require("../controllers/usersController");
const { route } = require("../app");

// Routes
router.get("/", getAllUsers);


module.exports = router;