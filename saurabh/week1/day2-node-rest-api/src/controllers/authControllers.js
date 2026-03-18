const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/appError");

// hardcoded user for demonstration
const user = {
  id: 1,
  username: "admin",
  password: "password"
};

exports.login = (req, res, next) => {
  try {
    const { username, password } = req.body;

    // validate input
    if (!username || !password) {
      return next(new AppError("Username and password are required", 400));
    }

    // check credentials
    if (username === user.username && password === user.password) {
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || "my_secret_key",
        { expiresIn: "1h" }
      );

      // send response
      return successResponse(res, "Login successful", { token });
    }

    // invalid credentials
    return next(new AppError("Invalid username or password", 401));

  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};