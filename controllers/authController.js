const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

const user = {
  id: 1,
  username: "hemang",
  password: "1234",
};

const login = (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError("Username and Password both are required", 400));
    }

    if (user.username != username || user.password != password) {
      return next(new AppError("Invalid credentials", 500));
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.JWT_SERCRET || "secretkey",
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
