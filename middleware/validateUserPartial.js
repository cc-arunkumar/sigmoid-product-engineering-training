const validateUserPartial = (req, res, next) => {
    const { name, email, age } = req.body;

    if (name !== undefined && name.trim() === "") {
        return res.status(400).json({ success: false, message: "User name cannot be empty" });
    }
    if (email !== undefined && !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" });
    }
    if (age !== undefined && (typeof age !== 'number' || age <= 0)) {
        return res.status(400).json({ success: false, message: "Age must be a positive number" });
    }
    next();
}

module.exports = validateUserPartial;