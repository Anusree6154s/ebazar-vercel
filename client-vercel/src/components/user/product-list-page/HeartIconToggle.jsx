import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import useWishlist from "../../../hooks/product-list-page/useWishlist";

export default function HeartIconToggle({ product, user }) {
  const { handleWishlist, productInWishlist } = useWishlist(product, user);

  return (
    <>
      {!productInWishlist ? (
        <HeartIcon
          className="h-10 w-10 lg:h-8 lg:w-8  rounded-full p-2 hover:bg-gray-100 text-gray-600  transition duration-300 border border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={() => handleWishlist(productInWishlist)}
        />
      ) : (
        <HeartIconSolid
          className="h-10 w-10 lg:h-8 lg:w-8  rounded-full p-2 hover:bg-gray-100 text-gray-600  transition duration-300 border border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={() => handleWishlist(productInWishlist)}
        />
      )}
    </>
  );
}
