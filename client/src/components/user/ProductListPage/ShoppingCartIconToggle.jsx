import { ShoppingCartIcon } from "@heroicons/react/outline";
import React from "react";
import useCart from "../../../hooks/ProductListPage/useCart";

export default function ShoppingCartIconToggle({product, user}) {
    const { handleCart, isProductInCart } = useCart(product, user);
  return (
    <>
      {" "}
      {!isProductInCart ? (
        <ShoppingCartIcon
          className="h-10 w-10 lg:h-8 lg:w-8  rounded-full p-2 hover:bg-gray-100 text-gray-700  transition duration-300 border dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={handleCart}
        />
      ) : (
        <ShoppingCartIcon
          className="h-10 w-10 lg:h-8 lg:w-8  rounded-full p-2 hover:bg-gray-100 text-gray-700  transition duration-300 border dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={handleCart}
        />
      )}
    </>
  );
}
