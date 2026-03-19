import "./config/env.js";
import express from "express";
import router from "./routes/product_routes.js";  
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import appRouter from "./routes/auth_routes.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import passport from "./config/passport.js";
import connectDB from "./config/mongo.js";

const app = express();
app.use(express.json());

app.use(logger);
app.use(apiLimiter);
app.use(passport.initialize());
app.use(router);
app.use(appRouter);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
