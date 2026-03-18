const users = require("../data/users");
const { successResponse } = require("../utils/apiResponse");

// GET all users
exports.getAllUsers = (req, res, next) => {
  try {
    return successResponse(res, "Users fetched", users);
  } catch (err) {
    next({ statusCode: 500, message: err.message });
  }
};

// CREATE user
exports.createUser = (req, res, next) => {
  try {
    const { name, email } = req.body;

    const newUser = {
      id: users.length + 1,
      name,
      email
    };

    users.push(newUser);

    return successResponse(res, "User created", newUser);
  } catch (err) {
    next({ statusCode: 500, message: err.message });
  }
};