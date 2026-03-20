import express from "express";
import dotenv from "dotenv";

// Load env
dotenv.config();

// DB
import connectMongo from "../src/config/mongo.js";
import { connectSQL } from "../src/config/sqlConnection.js";

// Routes
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Middleware
import errorHandler from "./middleware/errorHandler.js";
import logger from "./middleware/logger.js";

const app = express();

// Connect Databases
connectMongo();
connectSQL();
import { sequelize } from "./config/sqlConnection.js";

await sequelize.sync();

// Middlewares
app.use(express.json());
app.use(logger);

// Routes
app.get("/", (req, res) => {
  res.send("API Running");
});

app.use(productRoutes);
app.use("/api/auth", authRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});