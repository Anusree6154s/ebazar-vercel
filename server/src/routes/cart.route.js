const express = require("express");
const {
  fetchCartByUser,
  addToCart,
  deleteFromCart,
  updateCart,
  addToCartMany,
} = require("../controller/cart.controller.js");

const router = express.Router();

router
  .post("/", addToCart)
  .post("/many", addToCartMany)
  .get("/", fetchCartByUser)
  .delete("/:id", deleteFromCart)
  .patch("/:id", updateCart);

module.exports = router;
