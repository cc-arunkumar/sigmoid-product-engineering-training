const express = require("express");
const router = express.Router();
const { authlimiter } = require("../middleware/rateLimiter");

const login = require("../controllers/authController");

router.post("/login", authlimiter, login);

module.exports = router;
