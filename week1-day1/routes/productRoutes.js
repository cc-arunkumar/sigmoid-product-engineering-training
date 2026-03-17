const express = require("express");
const { getAll } = require("../controllers/productControllers");
const router = express.Router();

router.get("/products", getAll);

module.exports = router;