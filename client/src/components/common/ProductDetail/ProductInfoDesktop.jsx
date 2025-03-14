import { StarIcon } from "@heroicons/react/solid";
import React from "react";
import ProductButton from "./ProductButton";

const highlights = [
  " Premium Quality - Built to last with top-grade materials.",
  "Affordable - Great value at competitive prices.",
  "User-Friendly - Easy to use for everyone.",
  "Fast Delivery - Quick and reliable shipping.",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductInfoDesktop({
  product,
  handleQuantity,
  handleWishList,
  handleAdd,
  handleBuy,
  isAdmin,
}) {
  return (
    <div className="hidden lg:flex flex-col flex-[1_0_calc(100%/2)] gap-6 ">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-3xl">
        {product.title}
      </h1>

      <div className="flex gap-0">
        <div className="flex flex-col gap-4 flex-[1.75] border-r border-gray-300  dark:border-gray-500 pr-4">
          {/* Description and details */}

          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900 dark:text-gray-300">
                {product.description}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Brand{" "}
            </h3>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.brand}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Highlights
            </h3>
            <div className="mt-4">
              <ul className="list-disc space-y-2 pl-4 text-sm">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-gray-400 dark:text-gray-100"
                  >
                    <span className="text-gray-600 dark:text-gray-400">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="flex-1 pl-6 flex flex-col">
          <h2 className="sr-only">Product information</h2>
          <div className="flex flex-col gap-2">
            <span className="text-4xl tracking-tight text-gray-900 dark:text-gray-300">
              <span>₹</span>
              {(
                product.price -
                product.price * (product.discountPercentage / 100)
              ).toFixed(2)}
            </span>
            <div className="flex  flex-wrap gap-x-4 ">
              <p className="text-lg tracking-tight text-gray-400 dark:text-gray-300">
                <span>M.R.P:</span>
                <span className="line-through">₹ {product.price}</span>
              </p>
              <span className=" font-bold text-lg tracking-tight text-red-500 dark:text-orange-500">
                -{product.discountPercentage}%
              </span>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      product.rating > rating
                        ? "text-gray-900 dark:text-gray-200"
                        : "text-gray-200 dark:text-gray-700",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{product.rating} out of 5 stars</p>
            </div>
          </div>

          <div className="mt-6">
            {product.stock === 0 && (
              <p className="text-red-500 dark:text-orange-700">Out of Stock</p>
            )}
          </div>

          <div className="mt-12">
            <label className="text-sm font-medium dark:text-gray-300">
              Quantity:
            </label>
            <select
              onChange={handleQuantity}
              // value={product.quantity || 1}
              name="Quantity"
              id="quantity"
              className="border border-gray-300  dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 rounded-md pt-0 pb-0 ml-4"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <ProductButton
              handleClick={handleWishList}
              className={` bg-white dark:bg-gray-800  hover:bg-gray-100 dark:hover:bg-gray-700  ${
                isAdmin
                  ? "text-gray-500 focus:ring-gray-100 border-gray-100"
                  : "text-customBlue focus:ring-customBlue border-customBlue"
              }`}
              text="Add to WishList"
            />
            <ProductButton
              handleClick={handleAdd}
              className={`border-transparent text-white bg-opacity-80 focus:ring-customBlue ${
                product.stock === 0 || isAdmin
                  ? "bg-gray-300"
                  : "bg-customBlue dark:bg-blue-500 hover:bg-opacity-100 dark:hover:bg-blue-600"
              }`}
              text=" Add to Cart"
            />
            <ProductButton
              handleClick={handleBuy}
              className={`border-transparent text-white focus:ring-customBlue ${
                product.stock === 0 || isAdmin
                  ? "bg-gray-300"
                  : "bg-orange-500 hover:bg-orange-600 "
              }`}
              text="Buy Now"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
