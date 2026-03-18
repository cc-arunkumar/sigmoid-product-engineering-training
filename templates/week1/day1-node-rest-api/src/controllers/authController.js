const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

// Hardcoded users
const USERS = [
  {
    id: 1,
    username: "user",
    password: "1234",
    role: "user",
  },
  {
    id: 2,
    username: "admin",
    password: "1234",
    role: "admin",
  },
];

exports.login = (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError("Username and password are required", 400));
    }

    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role, // ✅ IMPORTANT
      },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1h" }
    );

    return successResponse(res, "Login successful", { token });

  } catch (error) {
    return next(new AppError(error.message || "Login failed", 500));
  }
};