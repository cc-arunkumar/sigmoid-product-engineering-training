const express = require("express");
const port = 8080;

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

app.get("/products", (req, res) => {
  const products = [
    { id: 101, name: "Laptop", price: 99 },
    { id: 102, name: "Keyboard", price: 35 },
    { id: 103, name: "Mobile", price: 19 },
    {
      id: 104,
      name: "earphones",
      price: 22,
    },
  ];

  res.send(products);
  // res.json(products);
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
