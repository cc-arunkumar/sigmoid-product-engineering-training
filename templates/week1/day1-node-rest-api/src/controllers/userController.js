exports.getAllUsers = (req, res) => {
  res.send("Get all users");
};

exports.getUserById = (req, res) => {
  res.send(`Get user with id ${req.params.id}`);
};