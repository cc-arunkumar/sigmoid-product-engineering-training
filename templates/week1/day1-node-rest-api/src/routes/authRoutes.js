const express = require("express")
const router = express.Router();

const {login} = require("../controllers/authControllers");
const { authLimiter } = require("../middleware/rateLimiter");

router.post("/login", authLimiter, login);

module.exports = router;