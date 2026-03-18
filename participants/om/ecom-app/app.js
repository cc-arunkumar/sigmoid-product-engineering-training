const express = require('express');
const PORT = 8000;

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});