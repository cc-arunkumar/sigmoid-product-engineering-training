const users = require("../data/users");

exports.getAllUsers = (req, res) => {
    res.json(users);
}

