const users = require("../data/users");

exports.getAllUsers = (req, res) => {
    res.json(users);
}

exports.getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
}

exports.createUser = (req, res) => {
    const { name, email } = req.body;
    const newUser = {
        id: Date.now(),
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
}

exports.updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
   else{
    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;

    res.status(200).json(user);

}
}

exports.deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if(userIndex === -1){
        return res.status(404).json({ message: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
}

exports.updatePartialUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
   else{
    const { name, email } = req.body;
    if(name) user.name = name;
    if(email) user.email = email;

    res.status(200).json(user);

}
}