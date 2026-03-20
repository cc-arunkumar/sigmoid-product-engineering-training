const SqlUser = require("../models/sqlUserModel");

exports.createSqlUser = async (req, res) => {
    try {
        // 1. Create the user
        const user = await SqlUser.create(req.body);
        
        // 2. Send success response
        res.status(201).json(user);
    } catch (error) {
        // 3. Catch errors (DB connection, validation, etc.)
        console.error("Error creating user:", error);
        res.status(500).json({ 
            message: "Failed to create user", 
            error: error.message 
        });
    }
};

exports.getSqlUsers = async (req, res) => {
    try {
        const users = await SqlUser.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};