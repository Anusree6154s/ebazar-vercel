import useCart from "../../../hooks/product-list-page/useCart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon as ShoppingCartIconSolid } from "@heroicons/react/24/solid";

export default function ShoppingCartIconToggle({ product, user }) {
  const { handleCart, isProductInCart } = useCart(product, user);
  return (
    <>
      {" "}
      {!isProductInCart ? (
        <ShoppingCartIcon
          className="h-10 w-10 lg:h-8 lg:w-8  rounded-full p-2 hover:bg-gray-100 text-gray-600  transition duration-300 border border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={handleCart}
        />
      ) : (
        <ShoppingCartIconSolid
          className="h-10 w-10 lg:h-8 lg:w-8  rounded-full p-2  hover:bg-gray-100 text-gray-600  transition duration-300 border border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={handleCart}
        />
      )}
    </>
  );
}
