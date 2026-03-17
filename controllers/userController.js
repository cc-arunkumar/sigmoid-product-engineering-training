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

exports.createUser = (req, res) => {
    const { name, email, age } = req.body;

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        age: age
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
    const userId = (req.params.id)*1;
    const user = users.find(u => u.id === userId);

    if(!user){
        return res.status(404).json({ message: "User not found!" });
    }

    const { name, email, age } = req.body;

    user.name = name;
    user.email = email;
    user.age = age;

    res.status(200).json(user);
};

