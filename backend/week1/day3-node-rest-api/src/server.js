const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const dbConnect = require("./config/db");
dbConnect();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
