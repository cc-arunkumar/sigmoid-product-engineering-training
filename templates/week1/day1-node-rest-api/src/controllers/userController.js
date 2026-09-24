exports.getAllUsers = (req, res) => {
  res.send("Get all users");
};

exports.getUserById = (req, res) => {
  res.send(`Get user with id ${req.params.id}`);
};

exports.createUser = (req, res) => {
  res.send("Create user");
};

exports.updateUser = (req, res) => {
  res.send(`Update user ${req.params.id}`);
};

exports.deleteUser = (req, res) => {
  res.send(`Delete user ${req.params.id}`);
};