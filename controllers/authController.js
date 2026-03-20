const jwt = require("jsonwebtoken");

const USERS = [
  { id: 1, username: "admin", password: "1234", role: "admin" }
];

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = USERS.find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};