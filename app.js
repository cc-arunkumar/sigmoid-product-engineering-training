const express = require("express");
const app = express();

const productRoutes = require("./routes/productRoutes");
const authRotes = require("./routes/authRoutes")

const logger = require("./middleware/logger");
const errorhandler = require("./middleware/errorHandler" );

app.use(express.json());
app.use(logger);

app.use("/api", productRoutes);
app.use("/api/auth", authRotes);

app.use(errorhandler);

app.listen(4000, () => {
    console.log(`Server running at http://localhost:4000`);
});
