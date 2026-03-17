const express = require("express");
const router = express.Router();

const {
  getAllUsers
} = require("../controllers/userController");

// Routes
router.get("/", getAllUsers);


module.exports = router;