const express = require('express');
const PORT = 8000;

const app = express();

app.use(express.json());

const productRoutes = require('./routes/productRoutes');

app.use(productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});