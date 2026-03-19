const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

const USER = [
  {
    id: 1,
    username: "admin",
    password: "1234",
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    password: "1234",
    role: "user",
  },
];

// ================= NORMAL LOGIN =================
exports.login = (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(
        new AppError("UserName and Password are required", 400)
      );
    }

    const user = USER.find((u) => u.username === username);

    if (!user || user.password !== password) {
      return next(new AppError("Invalid Credentials", 401));
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "mysecretkey",
      {
        expiresIn: "1h",
      }
    );

    return successResponse(res, "Login Successful", { token });
  } catch (error) {
    return next(
      new AppError(error.message || "Login Failed", 500)
    );
  }
};

// ================= GOOGLE OAUTH CALLBACK =================
exports.googleCallback = (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(
        new AppError("Google authentication failed", 401)
      );
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

    return successResponse(res, "Google login successful", {
      token,
    });
  } catch (error) {
    return next(
      new AppError(error.message || "OAuth login failed", 500)
    );
  }
};