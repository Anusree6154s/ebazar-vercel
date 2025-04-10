import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import useWishlist from "../../../hooks/ProductListPage/useWishlist";

export default function HeartIconToggle({product, user}) {
  const { handleWishlist, isProductInWishlist } = useWishlist(product, user);

  return (
    <>
      {!isProductInWishlist ? (
        <HeartIcon
          className="h-10 w-10 lg:h-8 lg:w-8  rounded-full p-2 hover:bg-gray-100 text-gray-700  transition duration-300 border dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={handleWishlist}
        />
      ) : (
        <HeartIconSolid
          className="h-10 w-10 lg:h-8 lg:w-8  rounded-full p-2 hover:bg-gray-100 text-gray-700  transition duration-300 border dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={handleWishlist}
        />
      )}
    </>
  );
}
