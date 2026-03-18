const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

const users = [
  {
    id: 1,
    username: "admin",
    password: 1234,
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    password: 1234,
    role: "user",
  },
];

const login = (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError("Username and Password both are required", 400));
    }

    const user = users.find((u) => u.username == username);

    if (!user || user.password != password) {
      return next(new AppError("Invalid credentials", 500));
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET || "mysecretkey",
      {
        expiresIn: "1h",
      },
    );

    return successResponse(res, "Token created successfully", token);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

module.exports = login;
