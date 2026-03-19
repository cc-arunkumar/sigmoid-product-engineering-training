const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { successResponse } = require("../utils/apiResponse");

// Mock users (for normal login)
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
    // 1. Extract data from request body
    const { username, password } = req.body;

    // 2. Validate input
    if (!username || !password) {
      return next(new AppError("Username and password are required", 400));
    }

    // 3. Find user from mock DB
    const user = USERS.find(u => u.username === username);

    // 4. Check if user exists and password matches
    if (!user || user.password !== password) {
      return next(new AppError("Invalid credentials", 401));
    }

    // 5. Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET || "mysecretkey",
      {
        expiresIn: "1h"
      }
    );

    // 6. Send success response
    return successResponse(res, "Login successful", { token });

  } catch (error) {
    return next(new AppError(error.message || "Login failed", 500));
  }
};

exports.googleCallback = (req, res, next) => {
  try {
    // 1. Passport attaches user to req after successful login
    const user = req.user;

    // 2. If user not found → authentication failed
    if (!user) {
      return next(new AppError("Google authentication failed", 401));
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1h" }
    );

    // 4. Send success response with token
    return successResponse(res, "Google login successful", { token });

  } catch (error) {
    return next(new AppError(error.message || "OAuth login failed", 500));
  }
};