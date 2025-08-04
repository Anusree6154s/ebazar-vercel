const mongoose = require("mongoose");
const { WishList } = require("../model/wishlist.model.js");
const { catchAsyncUtil, apiUtil } = require("../utils/index.js");
const status = require("http-status");
const { ApiError } = require("../utils/ApiError.util.js");
const httpStatus = require("http-status");

/**
 * Adds a product to the user's wishlist.
 * Creates a new wishlist entry with the product information provided in the request body.
 * @function
 * @name addToWishList
 * @memberof module:controller/wishlist.controller.js
 * @param {Object} req - Express request object. Expects wishlist data in `req.body`.
 * @param {Object} res - Express response object. Responds with the newly created wishlist item.
 * @returns {Promise<void>} Responds with the created wishlist item after populating product details.
 */
exports.addToWishList = catchAsyncUtil.catchAsync(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.product)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid product ID.");
  }

  const wishList = new WishList(req.body);
  const data = await wishList.save();
  await data.populate("product");
  res.status(status.OK).json(data);
});

/**
 * Adds a product to the user's wishlist.
 * Creates a new wishlist entry with the product information provided in the request body.
 * @function
 * @name addToWishList
 * @memberof module:controller/wishlist.controller.js
 * @param {Object} req - Express request object. Expects wishlist data in `req.body`.
 * @param {Object} res - Express response object. Responds with the newly created wishlist item.
 * @returns {Promise<void>} Responds with the created wishlist item after populating product details.
 */
exports.addToWishListMany = catchAsyncUtil.catchAsync(async (req, res) => {
  if (!Array.isArray(req.body)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Request body must be an array of wishlist items."
    );
  }

  // Validate all entries
  for (const item of req.body) {
    if (!item.product || !mongoose.Types.ObjectId.isValid(item.product)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Invalid product ID in one of the items."
      );
    }
    if (!item.user || !mongoose.Types.ObjectId.isValid(item.user)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Invalid user ID in one of the items."
      );
    }
  }

  // Insert many wishlist items
  const wishLists = await WishList.insertMany(req.body);
  console.log("🚀 ~ wishLists:", wishLists);
  // Populate 'product' for all created wishlist items
  const populated = await WishList.populate(wishLists, { path: "product" });
  console.log("🚀 ~ populated:", populated);
  res.status(status.OK).json(populated);

  // Use .populate('field') on a single document.
  // Use Model.populate(docs, { path: 'field' }) for an array of documents.
});

/**
 * Fetches the user's wishlist.
 * Retrieves all products in the wishlist for the authenticated user.
 * @function
 * @name fetchWishListByUser
 * @memberof module:controller/wishlist.controller.js
 * @param {Object} req - Express request object. Expects `id` in `req.user` to identify the user.
 * @param {Object} res - Express response object. Responds with the user's wishlist items.
 * @returns {Promise<void>} Responds with the user's wishlist items after populating product details.
 * @throws {apiUtil.ApiError} Throws a 404 (Not Found) error if no products are found in the wishlist.
 */
exports.fetchWishListByUser = catchAsyncUtil.catchAsync(async (req, res) => {
  const { id } = req.user;
  const data = await WishList.find({ user: id }).populate("product");
  res.status(status.OK).json(data);
});

/**
 * Deletes a product from the user's wishlist.
 * Removes the specified product from the wishlist using the product ID.
 * @function
 * @name deleteFromWishList
 * @memberof module:controller/wishlist.controller.js
 * @param {Object} req - Express request object. Expects `id` in `req.params` to identify the wishlist item to be deleted.
 * @param {Object} res - Express response object. Responds with a confirmation message after deletion.
 * @returns {Promise<void>} Responds with a confirmation message indicating the product was deleted.
 */
exports.deleteFromWishList = catchAsyncUtil.catchAsync(async (req, res) => {
  const { id } = req.params;
  let data = await WishList.findByIdAndDelete(id);
  console.log("🚀 ~ data:", data);
  if (!data) {
    throw new apiUtil.ApiError(status.NOT_FOUND, "Wishlist item not found");
  }
  res
    .status(status.OK)
    .json({ message: "Product deleted from wishlist.", data });
});
