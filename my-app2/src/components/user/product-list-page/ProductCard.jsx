import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../../redux";
import ImageTransformer from "../ImageTransformer";
import HeartIconToggle from "./HeartIconToggle";
import RatingStars from "./RatingStars";
import ShoppingCartIconToggle from "./ShoppingCartIconToggle";

export default function ProductCard({ product }) {
  const user = useSelector(selectLoggedInUser);

  return (
    <div
      className="group relative border-[1.5px] dark:border-gray-700  rounded-md p-2 flex flex-col justify-between dark:hover:bg-gradient-to-b dark:hover:from-gray-900 dark:hover:to-transparent transition duration-300 "
      id="product-grid-card"
    >
      <div className="aspect-[1/1] w-full min-h-auto overflow-hidden rounded-md  group-hover:opacity-75 dark:opacity-95  dark:group-hover:opacity-100 bg-gray-50 flex-1 transition-opacity duration-300">
        <ImageTransformer src={product.thumbnail} className={""} />
      </div>
      <div className="mt-4 flex-1">
        <Link to={`/product-detail/${product.id}`}>
          <span aria-hidden="true" className="absolute inset-0" />
        </Link>
        <div className="flex flex-col gap-2 justify-between h-full">
          <div>
            <span className="text-sm sm:text-xs text-gray-400 font-bold uppercase">
              {product.brand || "No Brand"}
            </span>
            <h3 className="text-xl sm:text-base lg:text-sm text-gray-700 dark:text-gray-200 truncate">
              {product.title}
            </h3>
          </div>
          <div className="flex flex-col">
            <p className=" font-medium text-4xl sm:text-2xl lg:text-xl text-gray-900 dark:text-gray-100">
              <span className="mr-1">₹</span>
              {(
                product.price -
                product.price * (product.discountPercentage / 100)
              ).toFixed(2)}
            </p>
            <div className="flex gap-2 text-sm">
              <p className="text-lg sm:text-base lg:text-sm font-medium line-through text-gray-400 dark:text-gray-500 ">
                ${product.price}
              </p>
              <p className="text-lg sm:text-base lg:text-sm text-green-600 dark:text-green-600 font-medium  ">
                {product.discountPercentage}% off
              </p>
            </div>
            <p className="mt-1 text-gray-500 dark:text-gray-400 flex gap-[0.18rem] items-center ">
              <RatingStars rating={product.rating} />
            </p>
          </div>
          <div className="flex justify-center gap-5 z-10 cursor-pointer">
            <ShoppingCartIconToggle product={product} user={user} />
            <HeartIconToggle product={product} user={user} />
          </div>
        </div>
      </div>
      <p className="text-red-500 text-[0.65rem] font-bold text-center mt-2">
        {product.stock === 0 && "Out of stock"}
      </p>
    </div>
  );
}
