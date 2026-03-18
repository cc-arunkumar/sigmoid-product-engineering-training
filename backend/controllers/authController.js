const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

// Mock users
const USERS = [
  {
    id: 1,
    username: "admin",
    password: "1234",
    role: "admin"
  },
  {
    id: 2,
    username: "user",
    password: "1234",
    role: "user"
  }
];

exports.login = (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError("Username and password are required", 400));
    }

    // Find user
    const user = USERS.find(u => u.username === username);

    if (!user || user.password !== password) {
      return next(new AppError("Invalid credentials", 401));
    }

    // Generate token with role
    const token = jwt.sign(
      {
        userid: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1h" }
    );

    return successResponse(res, "Login successful", { token });

  } catch (error) {
    return next(new AppError(error.message || "Login failed", 500));
  }
};