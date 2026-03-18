const validateUserPartial = (req, res, next) => {
    const { name, email, age } = req.body;

    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === '' || name.trim().length > 50) {
            return res.status(400).json({
                success: false,
                message: "User name must be a non-empty string with a maximum length of 50 characters"
            });
        }
    }

    if (email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof email !== 'string' || !emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Email must be a valid email address"
            });
        }
    }

    if (age !== undefined) {
        if (typeof age !== 'number' || age < 0 || age > 150) {
            return res.status(400).json({
                success: false,
                message: "Age must be a number between 0 and 150"
            });
        }
    }

    next();
};

module.exports = validateUserPartial;