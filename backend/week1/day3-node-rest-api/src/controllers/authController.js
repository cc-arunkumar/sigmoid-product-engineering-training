const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

// Hardcoded user (for training purpose)
const USER = {
  id: 1,
  username: "admin",
  password: "1234",
};

exports.login = (req, res, next) => {
  try {
    let { username, password } = req.body;

    username = username.trim();

    // 1. Validate input
    if (!username || !password) {
      return next(new AppError("Username and password are required", 400));
    }

    // 2. Check credentials
    if (username !== USER.username || password !== USER.password) {
      return next(new AppError("Invalid credentials", 401));
    }

    // 3. Generate token
    const token = jwt.sign(
      {
        userId: USER.id,
        username: USER.username,
      },
      process.env.JWT_SECRET || "mysecretkey",
      {
        expiresIn: "1h",
      },
    );

    // 4. Send response
    return successResponse(res, "Login successful", { token });
  } catch (error) {
    return next(new AppError(error.message || "Login failed", 500));
  }
};
