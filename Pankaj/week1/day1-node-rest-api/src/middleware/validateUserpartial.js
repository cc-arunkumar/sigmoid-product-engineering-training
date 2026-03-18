const ValidateUserPartial = (req, res, next) => {
    const { name, email } = req.body;

    if (name !== undefined && name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Name should not be empty"
        });
    }          
    if (email !== undefined && email.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Email should not be empty"
        });
    }       

    next();
};

module.exports = ValidateUserPartial;