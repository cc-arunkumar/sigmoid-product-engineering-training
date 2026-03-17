// import express from "express"
// const app = express();
// app.get("/", (req, res) => {
//   res.send("Server is working");
// });
// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
import express from "express"
import router from "./routes/product_routes.js";
import logger from "./middlewares/logger.js";
const app = express();
app.use(express.json());
app.use(logger)
app.use(router)
app.listen(3000, () => {
  console.log("Server running on port 3000");
});