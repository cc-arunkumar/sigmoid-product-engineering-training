const express = require('express');
const PORT = 8000;

const app = express();

const productRoutes = require('./routes/productRoutes');

const logger = require('./middleware/logger');

app.use(express.json());
app.use(logger);

app.use(productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});