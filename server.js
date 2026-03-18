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
import errorHandler from "./middlewares/errorHandler.js";
import appRouter from "./routes/auth_routes.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
const app = express();
app.use(express.json());
app.use(logger)
app.use(apiLimiter)
app.use(router)
app.use(appRouter)
app.use(errorHandler)
app.listen(3000, () => {
  console.log("Server running on port 3000");
});