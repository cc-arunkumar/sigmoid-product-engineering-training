const express = require('express')
const authController = require('../controllers/authController')
const { authlImiter } = require('../middleware/rateLimiter')

const router = express.Router();

router.post('/login', authlImiter,authController.login);

module.exports = router;