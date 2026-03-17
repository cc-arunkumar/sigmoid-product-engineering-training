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
router.post("/users", (req, res) => {
  res.send("Create User");
});
router.put("/users/:id", (req, res) => {
  res.send("Update User");
});
router.delete("/users/:id", (req, res) => {
  res.send("Delete User");
});


module.exports = router;