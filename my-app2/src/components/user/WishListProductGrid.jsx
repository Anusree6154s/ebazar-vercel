import { useSelector } from "react-redux";
import { selectWishList } from "../../redux";
import Loader from "../common/Loader";
import ProductCard from "./product-list-page/ProductCard";

export default function WishListProductGrid() {
  const wishlistProducts = useSelector(selectWishList);

  if (!wishlistProducts) return <Loader fill="#21AAF3" />;
  if (wishlistProducts.length === 0) {
    return (
      <div className="text-center text-gray-400 text-lg w-full">
        WishList is Empty
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 rounded-md">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8 ">
        <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8 py-8">
          {wishlistProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
