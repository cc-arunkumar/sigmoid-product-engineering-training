require('dotenv').config();
const express = require("express")
const connectDB = require("./config/mongo")
const {connectSQL} = require("./config/sqlConnection")
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");
const passport = require("./config/passport");
const {sequelize} = require("./config/sqlConnection");

// Sync all models with the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(err => {
    console.error("Error syncing database:", err);
  });

connectDB();
connectSQL();
const app = express();

app.use(express.json());
app.use(logger);
app.use(apiLimiter);

app.use(passport.initialize());

app.use(productRoutes);
app.use(authRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Listening on port 3000")
})