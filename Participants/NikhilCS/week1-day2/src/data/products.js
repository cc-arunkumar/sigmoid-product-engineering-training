const products = [
  {
    id: 1,
    name: "Laptop",
    price: 100000.0,
    category: "Electronics",
    stock: 3,
  },
  {
    id: 4,
    name: "Keyboard",
    price: 10000.0,
    category: "Hardware",
    stock: 2,
  },
  {
    id: 2,
    name: "Mobile",
    price: 25000.0,
    category: "Electronics",
    stock: 5,
  },
  {
    id: 3,
    name: "Headphone",
    price: 35000.0,
    category: "accessories",
    stock: 6,
  }, //the sequence of display of individual product objects is decided in same sequence as the one in which we
];

module.exports = products;
//named export version is
// module.exports={products}
