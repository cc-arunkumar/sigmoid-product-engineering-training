// const express = require("express");

// const app = express();

// app.use(express.json());

// const userRoutes = require('./routes/userRoutes');
// app.use(userRoutes);

// // Register routes
// app.get("/", (req, res) => {
//     res.send("welcome to backend development");
// });

// module.exports = app;


const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());  

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Backend Development with Express.js!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
}); 