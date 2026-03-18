const ValidateUser = (req, res, next) => { 
    const { name, email } = req.body;

    if (name === undefined || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Name is required and should not be empty"
        });
    }

    if (email === undefined || email.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Email is required and should not be empty"
        });
    }

    next();
};

module.exports = ValidateUser;