let users = require("../data/users");

// Get all users
exports.getAllUsers = (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

// Get user by ID
exports.getUserById = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }

    res.json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new user
exports.createUser = (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      const err = new Error("Name and email are required");
      err.statusCode = 400;
      return next(err);
    }

    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name,
      email,
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

// Update user by ID
exports.updateUser = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    const user = users.find((u) => u.id === userId);

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }

    if (name) user.name = name;
    if (email) user.email = email;

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// Delete user by ID
exports.deleteUser = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }

    const deletedUser = users.splice(userIndex, 1);

    res.json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser[0],
    });
  } catch (err) {
    next(err);
  }
};