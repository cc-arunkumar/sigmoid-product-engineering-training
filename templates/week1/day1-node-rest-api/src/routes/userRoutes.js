const express = require("express");
const router = express.Router();

const {
  getAllUsers
} = require("../controllers/userController");
const { routes } = require("../app");

// Routes

routes.get("/users", getAllUsers);
router.get("/users/:id", (req, res) => {
  res.send("Get User by ID");
});


module.exports = router;