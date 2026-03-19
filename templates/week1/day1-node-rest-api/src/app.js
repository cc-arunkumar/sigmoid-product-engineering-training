import express from "express";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
dotenv.config();
import createDatabase from "./config/createDB.js";
import { connectSQL } from "./config/sqlConnection.js";
import { sequelize } from "./config/sqlConnection.js";

await sequelize.sync();
createDatabase();
connectSQL();
import connectDB from "./config/mongo.js";
const app = express()
connectDB();
app.get('/', (req, res) => {
res.send("API Running");
});
console.log("ENV PORT:", process.env.PORT);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);

});
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "./config/passport.js";
app.use(logger);
app.use(express.json());
app.use(apiLimiter);
app.use(passport.initialize()); 
app.use(productRoutes);
app.use(authRoutes);
app.use(errorHandler);
// app.listen(3000, () => {
//     console.log("SERVER ON 3000")
// })