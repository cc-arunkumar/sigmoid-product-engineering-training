const express = require("express");
const router = express.Router();
const app = express();

const {login}=require("../controllers/authController");

router.post("/login", login);

module.exports = router;


