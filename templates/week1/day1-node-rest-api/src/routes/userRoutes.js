const express = require("express");
const router = express.Router();

const {
  getAllUsers
} = require("../controllers/userController");
const { routes } = require("../app");

// Routes

routes.get("/users", getAllUsers);



module.exports = router;