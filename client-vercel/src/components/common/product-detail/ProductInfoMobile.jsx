import { getDiscountedPrice } from "../../../util/discounted-price";
import RatingStars from "../../user/product-list-page/RatingStars";
import CustomSelect from "../CustomSelect";
import ProductButton from "./ProductButton";

const highlights = [
  "Premium Quality - Built to last with top-grade materials.",
  "Affordable - Great value at competitive prices.",
  "User-Friendly - Easy to use for everyone.",
  "Fast Delivery - Quick and reliable shipping.",
];

export default function ProductInfoMobile({
  product,
  handleQuantity,
  handleWishList,
  handleAdd,
  handleBuy,
}) {
  return (
    <div className="flex flex-col gap-10 lg:hidden">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-3xl">
        {product.title}
      </h1>

      {/* Options */}
      <div className="flex-1">
        <h2 className="sr-only">Product information</h2>
        <div>
          <span className="text-4xl tracking-tight text-gray-900 dark:text-gray-300">
            <span>₹</span>
            {getDiscountedPrice(product.price, product.discountPercentage, 1)}
          </span>
          <div className="flex flex-wrap gap-4 ">
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
              <RatingStars rating={product.rating} />
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
          <label className="text-sm font-medium dark:text-gray-300 mr-2">
            Quantity:
          </label>
          <CustomSelect
            options={[1, 2, 3, 4]}
            onClickFn={handleQuantity}
            startingValue={1}
          />
        </div>

        <div className="mt-10 flex flex-col gap-2">
          <ProductButton
            handleClick={handleWishList}
            className="border-customBlue bg-white dark:bg-gray-800 text-customBlue hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-customBlue"
            text="Add to WishList"
          />
          <ProductButton
            handleClick={handleAdd}
            className={`border-transparent text-white bg-opacity-80 focus:ring-customBlue ${
              product.stock === 0
                ? "bg-gray-300"
                : "bg-customBlue dark:bg-blue-500 hover:bg-opacity-100 dark:hover:bg-blue-600"
            }`}
            text=" Add to Cart"
          />
          <ProductButton
            handleClick={handleBuy}
            className={`border-transparent text-white focus:ring-customBlue ${
              product.stock === 0
                ? "bg-gray-300"
                : "bg-orange-500 hover:bg-orange-600 "
            }`}
            text="Buy Now"
          />
        </div>
      </div>

      <div className="p-4 border rounded-md dark:border-gray-700">
        <h1 className="font-bold text-lg mb-4 dark:text-white">Product Description</h1>
        <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}
