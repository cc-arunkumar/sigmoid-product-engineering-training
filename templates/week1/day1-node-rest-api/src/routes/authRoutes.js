const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");

// Base: /api/auth
router.post("/api/login", login);

module.exports = router;