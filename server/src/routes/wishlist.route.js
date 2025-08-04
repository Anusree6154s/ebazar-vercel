const express = require("express");
const {
  fetchWishListByUser,
  addToWishList,
  deleteFromWishList,
  updateWishList,
  addToWishListMany,
} = require("../controller/wishlist.controller.js");

const router = express.Router();

router
  .post("/", addToWishList)
  .post("/many", addToWishListMany)
  .get("/", fetchWishListByUser)
  .delete("/:id", deleteFromWishList);

module.exports = router;
