const express = require("express");
const router = express.Router();

const {
  getAllUsers,
} = require("../controllers/usersController");
const { route } = require("../app");

// Routes
router.get("/", getAllUsers);
router.post("/", (req, res) => {
  res.send("Create a new user");
});
router.get("/:id", (req, res) => {
  res.send(`Get user with ID ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`Delete user with ID ${req.params.id}`);
});

router.put("/:id", (req, res) => {
  res.send(`Update user with ID ${req.params.id}`);
});

router.patch("/:id", (req, res) => {
  res.send(`Partially update user with ID ${req.params.id}`);
});

module.exports = router;