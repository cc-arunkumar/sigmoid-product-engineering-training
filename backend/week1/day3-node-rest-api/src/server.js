const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const dbConnect = require("./config/db");
const { connectSQL } = require("./config/sql");

dbConnect();
connectSQL();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
