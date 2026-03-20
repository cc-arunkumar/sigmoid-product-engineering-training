import "./config/env.js";
import express from "express";
import router from "./routes/product_routes.js";  
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import appRouter from "./routes/auth_routes.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import passport from "./config/passport.js";
import connectDB from "./config/mongo.js";
import {connectSQL} from "./config/sqlConnection.js";
import {sequelize} from "./config/sqlConnection.js"

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
  await connectSQL();
  await connectDB();
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
