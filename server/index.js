const newrelic = require('newrelic');
require('dotenv').config();
const express = require("express");
var app = express();

const products = require('./controllers/products.js');
app.use(express.json());
const cart = require('./controllers/cart.js');
app.use("/products", products);
app.use("/cart", cart);



app.listen(3000, function () {
  console.log("listening on port 3000");
});

