let users = require('../data/users');

exports.getAllUsers = (req, res) => {
    res.json(users);
};


exports.getUserById = (req, res) => {
    const userId = (req.params.id)*1;
    const user = users.find(u => u.id === userId);

    if(!user){
        return res.status(404).json({ message: "User not found!" });
    }

    res.json(user);
};


