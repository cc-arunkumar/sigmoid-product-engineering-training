const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.listen(PORT, () => {
  return console.log(`Server running on port ${PORT}`);
});
