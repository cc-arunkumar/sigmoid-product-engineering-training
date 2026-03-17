const express = require("express");
const router = express.Router();

const {
  getAllUsers,
} = require("../controllers/usersController");

// Routes
router.get("/", getAllUsers);
router.post("/", (req, res) => {
  res.send("Create a new user");
});

module.exports = router;