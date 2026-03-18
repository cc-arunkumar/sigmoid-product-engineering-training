const users = require("../data/user");

exports.getAllUsers = (req, res) => {
    res.json(users);
}

exports.getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    res.json(user);
}

exports.createUser = (req, res) => {
    const { name, email, age } = req.body;

    const newUser = {
        id: users[users.length - 1].id + 1,
        name: name,
        email: email,
        age: age
    }
    console.log("Newly created User = ", newUser)
    users.push(newUser);
    res.status(201).json({
        status: 201,
        message: "User created successfully",
        user: newUser
    })
}

exports.updateUser = (req, res) => {
    const userId = req.params.id * 1;
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    const { name, email, age } = req.body;

    user.name = name;
    user.email = email;
    user.age = age;

    res.status(200).json(user);
}

exports.deleteUser = (req, res) => {
    const userId = req.params.id * 1;
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    users.splice(userIndex, 1);
    res.json({
        message: "User deleted successfully"
    });
}

exports.patchUser = (req, res) => {
    const userId = req.params.id * 1;
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    const { name, email, age } = req.body;
    if (name !== undefined) {
        user.name = name;
    }
    if (email !== undefined) {
        user.email = email;
    }
    if (age !== undefined) {
        user.age = age;
    }
    res.status(200).json(user)
}