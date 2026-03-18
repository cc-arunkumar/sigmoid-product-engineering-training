const express = require('express');
const router = express.Router();

const {login} = require('../controllers/authController');
const { authLimiter } = require('../middlewares/rateLimiter');

router.post('/login', authLimiter, login);  // Apply rate limiter to login route

//base: /api/auth



module.exports = router;