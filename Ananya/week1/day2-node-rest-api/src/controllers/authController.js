exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        // 1. Validate input
        if (!username || !password) {
            return next(new AppError("Username and password are required", 400));
        }

        // 2. Find user
        const user = User.find(u => u.username === username);

        // 3. Validate credentials (FIXED)
        if (!user || password !== user.password) {
            return next(new AppError("Invalid Credentials", 401));
        }

        // 4. Generate token
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET || "mysecretkey",
            { expiresIn: "1h" }
        );

        return successResponse(res, "login successful", { token });

    } catch (error) {
        return next(new AppError(error.message || "login failed", 500));
    }
};