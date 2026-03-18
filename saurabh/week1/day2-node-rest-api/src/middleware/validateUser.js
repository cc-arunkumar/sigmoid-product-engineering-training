const validateUser = (req, res, next) => {
    const { name, email, age } = req.body;

    if (!name || name.trim() === "" || name.trim().length < 0 || name.trim().length > 50) {
        return res.status(400).json({
            success: false,
            message: "User name is required and must be between 1-50 characters"
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Valid email is required"
        })
    }

    if (age === undefined || age < 0 || age > 150) {
        return res.status(400).json({
            success: false,
            message: "Valid age is required (0-150)"
        })
    }

    next();
}

module.exports = validateUser;