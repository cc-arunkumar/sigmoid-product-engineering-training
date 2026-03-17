const users = [];

const getAllUsers = (req, res) => {
    res.json(users);
};

const createUser = (req, res) => {
    const { name, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const foundUser = users.find(u => u.id === id);
    if (foundUser) {
        res.json(foundUser);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};
