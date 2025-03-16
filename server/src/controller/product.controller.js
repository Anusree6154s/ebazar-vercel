const { Product } = require("../model/product.model.js");
const status = require("http-status");
const { catchAsyncUtil, apiUtil } = require("../utils/index.js");

/**
 * Controller to create a new product.
 *
 * @function
 * @name createProduct
 * @memberof module:controller/product.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body containing the product data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the created product and status code 201 (Created)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.createProduct = catchAsyncUtil.catchAsync(async (req, res) => {
  const product = new Product(req.body);
  const data = await product.save();
  res.status(status.CREATED).json(data);
});

/**
 * Controller to fetch products based on query parameters.
 *
 * @function
 * @name fetchAllQuery
 * @memberof module:controller/product.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for filtering, sorting, and pagination:
 *   - `role` (optional): Filter products based on user or admin role
 *   - `_sort` (optional): Field to sort by
 *   - `_order` (optional): Order of sorting, 'asc' or 'desc'
 *   - `category` (optional): Filter products by category
 *   - `brand` (optional): Filter products by brand
 *   - `_page` (optional): Page number for pagination
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the filtered, sorted, and paginated list of products and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.fetchAllQuery = catchAsyncUtil.catchAsync(async (req, res) => {
  const filter = {};
  const sort = {};

  if (req.query.role === "user") filter.deleted = { $ne: true };
  if (req.query._sort && req.query._order)
    sort[req.query._sort] = req.query._order === "desc" ? -1 : 1;
  if (req.query.category)
    filter.category = { $in: req.query.category.split(",") };
  if (req.query.brand) filter.brand = { $in: req.query.brand.split(",") };

  const pagination = {};
  if (req.query._page && !req.query.brand && !req.query.category) {
    const page = req.query._page;
    pagination.limit = 10;
    pagination.skip = pagination.limit * (page - 1);
  }

  const data = await Product.find(filter)
    .sort(sort)
    .skip(pagination.skip || 0)
    .limit(pagination.limit || 0)
    .exec();

  res.status(status.OK).json(data);
});

/**
 * Controller to fetch a product by its ID.
 *
 * @function
 * @name fetchProductsById
 * @memberof module:controller/product.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters including `id` of the product to fetch
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the product data and status code 200 (OK)
 * @throws {apiUtil.ApiError} Throws a 404 (Not Found) error if the product is not found
 * @throws {Error} Will forward any other errors to the error-handling middleware
 */
exports.fetchProductsById = catchAsyncUtil.catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Product.findById(id);
  if (!data) {
    throw new apiUtil.ApiError(status.NOT_FOUND, "Product not found");
  }
  //Enable Vercel caching (1 day cache)
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(status.OK).json(data);
});

/**
 * Controller to update a product by its ID.
 *
 * @function
 * @name updateProduct
 * @memberof module:controller/product.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters including `id` of the product to update
 * @param {Object} req.body - The request body containing the updated product data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the updated product data and status code 200 (OK)
 * @throws {apiUtil.ApiError} Throws a 404 (Not Found) error if the product is not found
 * @throws {Error} Will forward any other errors to the error-handling middleware
 */
exports.updateProduct = catchAsyncUtil.catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw new apiUtil.ApiError(status.NOT_FOUND, "Product not found");
  }
  res.status(status.OK).json(data);
});

/**
 * Controller to get count of total products.
 *
 * @function
 * @name getProductCount
 * @memberof module:controller/product.controller.js
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the total product count and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.getProductCount = catchAsyncUtil.catchAsync(async (req, res) => {
  const data = await Product.estimatedDocumentCount();
  res.status(status.OK).json(data);
});
