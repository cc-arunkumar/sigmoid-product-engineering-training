const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

const USER = [
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

    const user = USER.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = jwt.sign(
      {
        userID: user.id,
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


exports.googleCallback = (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new AppError("Google authentication failed", 401));
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1h" }
    );

    return successResponse(res, "Google login successful", { token });

  } catch (error) {
    return next(
      new AppError(error.message || "OAuth login failed", 500)
    );
  }
};