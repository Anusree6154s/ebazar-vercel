
const { catchAsyncUtil, apiUtil } = require("../utils/index.js");
const httpStatus = require('http-status');
const { Cart } = require('../model/cart.model');
const mongoose = require('mongoose');

/**
 * Controller to add a product to the cart.
 * 
 * @function
 * @name addToCart
 * @memberof module:controller/cart.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body containing the cart data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the created cart item and status code 201 (Created)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.addToCart = catchAsyncUtil.catchAsync(async (req, res) => {
    const cart = new Cart(req.body);
    const data = await cart.save();
    await data.populate('product');
    res.status(httpStatus.CREATED).json(data);
});

/**
 * Adds a product to the user's cart.
 * Creates a new cart entry with the product information provided in the request body.
 * @function
 * @name addToCart
 * @memberof module:controller/cart.controller.js
 * @param {Object} req - Express request object. Expects cart data in `req.body`.
 * @param {Object} res - Express response object. Responds with the newly created cart item.
 * @returns {Promise<void>} Responds with the created cart item after populating product details.
 */
exports.addToCartMany = catchAsyncUtil.catchAsync(async (req, res) => {
  if (!Array.isArray(req.body)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Request body must be an array of cart items."
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

  // Insert many cart items
  const carts = await Cart.insertMany(req.body);
  // Populate 'product' for all created cart items
  const populated = await Cart.populate(carts, { path: "product" });
  res.status(httpStatus.OK).json(populated);

  // Use .populate('field') on a single document.
  // Use Model.populate(docs, { path: 'field' }) for an array of documents.
});


/**
 * Controller to fetch all cart items for a specific user.
 * 
 * @function
 * @name fetchCartByUser
 * @memberof module:controller/cart.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.user - The user object containing user details
 * @param {string} req.user.id - The ID of the user whose cart items are to be fetched
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the list of cart items and status code 200 (OK)
 * @throws {apiUtil.ApiError} Throws a 404 error if no items are found in the cart
 */
exports.fetchCartByUser = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.user;
    const data = await Cart.find({ user: id }).populate('product');

    res.status(httpStatus.OK).json(data);
});


/**
 * Controller to delete an item from cart
 * 
 * @function
 * @name deleteFromCart
 * @memberof module:controller/cart.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.params - The request parameters containing the cart item ID
 * @param {string} req.params.id - The ID of the cart item to be deleted
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the deleted cart item and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.deleteFromCart = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new apiUtil.ApiError(httpStatus.BAD_REQUEST, 'Invalid cart item ID');
    }

    const data = await Cart.findByIdAndDelete(id);

    if (!data) throw new apiUtil.ApiError(httpStatus.NOT_FOUND, 'Empty cart')

    res.status(httpStatus.OK).json(data);
});


/**
 * Controller to update a specific cart item.
 * 
 * @function
 * @name updateCart
 * @memberof module:controller/cart.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.params - The request parameters containing the cart item ID
 * @param {string} req.params.id - The ID of the cart item to be updated
 * @param {Object} req.body - The request body containing the updated cart data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the updated cart item and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.updateCart = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new apiUtil.ApiError(httpStatus.BAD_REQUEST, 'Invalid cart item ID');
    }

    const updateData = req.body;
    if (Object.keys(updateData).length === 0) {
        throw new apiUtil.ApiError(httpStatus.BAD_REQUEST, 'No update item provided')
    }

    const data = await Cart.findByIdAndUpdate(id, updateData, { new: true });
    if (!data) {
        throw new apiUtil.ApiError(httpStatus.NOT_FOUND, 'Cart item does not exist')
    }
    await data.populate('product');

    res.status(httpStatus.OK).json(data);
});