import {
  HeartIcon,
  ShoppingCartIcon,
  StarIcon as StarIconOutline,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToWishlistIDB,
  existsInWishlistIDB,
  removeFromWishlistIDB,
} from "../../../indexedDB/wishlistDB";
import {
  addToWishListAsync,
  decrementWishlistLength,
  deleteItemFromWishListAsync,
  incrementWishlistLength,
  selectLoggedInUser,
  selectWishList,
} from "../../../redux";
import ImageTransformer from "../ImageTransformer";
import Loader from "../../common/Loader";

export function ProductGrid({ products }) {
  if (!products)
    return (
      <div className="flex col-span-3 h-fit justify-center">
        <Loader fill="#21AAF3" />
      </div>
    );
  if (products.length === 0)
    return (
      <p className="text-gray-500 text-center col-span-3">
        No Products Available
      </p>
    );
  return (
    <section className="lg:col-span-3" id="product-grid">
      <div className="mx-auto max-w-2xl  py-0  sm:py-0 lg:max-w-7xl ">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProductCard = ({ product }) => {
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const user = useSelector(selectLoggedInUser);
  const wishList = useSelector(selectWishList);

  useEffect(() => {
    const checkProductInWishlist = async () => {
      const isProductInWishlist = await existsInWishlistIDB(product.id);
      setIsProductInWishlist(isProductInWishlist);
    };
    checkProductInWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const handleWishlist = useCallback(async () => {
    if (!user) {
      console.log("no user");
      try {
        const isProductInWishlistIDB = await existsInWishlistIDB(product.id);
        if (isProductInWishlistIDB) {
          await removeFromWishlistIDB(product.id);
          dispatch(decrementWishlistLength());
          setIsProductInWishlist(false);
        } else {
          await addToWishlistIDB(product);
          dispatch(incrementWishlistLength());
          setIsProductInWishlist(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("user");
      const isProductInWishlist = wishList.some((item) => item === product);
      if (isProductInWishlist) {
        dispatch(addToWishListAsync({ product: product.id, user: user.id }));
      } else {
        dispatch(deleteItemFromWishListAsync(product.id));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShoppingCart = useCallback(async () => {
    if (!user) {
      console.log("no user");
      try {
        const isProductInCartIDB = await existsInWishlistIDB(product.id);
        if (isProductInCartIDB) {
          // await removeFromCartIDB(product.id);
          dispatch(decrementWishlistLength());
          setIsProductInWishlist(false);
        } else {
          // await addToCartIDB(product);
          dispatch(incrementWishlistLength());
          setIsProductInWishlist(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("user");
      const isProductInCart = wishList.some((item) => item === product);
      if (isProductInCart) {
        dispatch(addToWishListAsync({ product: product.id, user: user.id }));
      } else {
        dispatch(deleteItemFromWishListAsync(product.id));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="group relative border-[1.5px] dark:border-gray-700  rounded-md p-2 flex flex-col justify-between dark:hover:bg-gradient-to-b dark:hover:from-gray-900 dark:hover:to-transparent transition duration-300 "
      id="product-grid-card"
    >
      <div className="aspect-[1/1] w-full min-h-auto overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 dark:opacity-95  dark:group-hover:opacity-100  lg:h-60  bg-gray-50 flex-1 transition-opacity duration-300">
        <ImageTransformer src={product.thumbnail} className={""} />
      </div>
      <div className="mt-4 flex-1">
        <Link to={`/product-detail/${product.id}`}>
          <span aria-hidden="true" className="absolute inset-0" />
        </Link>
        <div className="flex flex-col gap-2 justify-between h-full">
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase">
              {product.brand || "No Brand"}
            </span>
            <h3 className="text-sm text-gray-700 dark:text-gray-200 truncate">
              {product.title}
            </h3>
          </div>
          <div className="flex flex-col">
            <p className=" font-medium text-3xl md:text-2xl text-gray-900 dark:text-gray-100">
              <span className="mr-1">₹</span>
              {(
                product.price -
                product.price * (product.discountPercentage / 100)
              ).toFixed(2)}
            </p>
            <div className="flex gap-2 text-sm">
              <p className="font-medium line-through text-gray-400 dark:text-gray-500 ">
                ${product.price}
              </p>
              <p className=" text-green-600 dark:text-green-600 font-medium  ">
                {product.discountPercentage}% off
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex gap-[0.18rem] items-center ">
              {[0, 1, 2, 3, 4].map((index) => {
                const isFullStar = product.rating >= index + 1; // Fully filled star

                return (
                  <span key={index}>
                    {isFullStar ? (
                      <StarIconSolid className="text-yellow-400 h-4 w-4" />
                    ) : (
                      <StarIconOutline className="text-gray-300 dark:text-yellow-700 h-4 w-4" />
                    )}
                  </span>
                );
              })}
            </p>
          </div>
          <div className="flex justify-center gap-5 z-10 cursor-pointer">
            <ShoppingCartIcon
              className="h-8 w-8 rounded-full p-2 hover:bg-gray-100 text-gray-700  transition duration-300 border dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={handleShoppingCart}
            />
            {!isProductInWishlist ? (
              <HeartIcon
                className="h-8 w-8  rounded-full p-2 hover:bg-gray-100 text-gray-700  transition duration-300 border dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={handleWishlist}
              />
            ) : (
              <HeartIconSolid
                className="h-8 w-8  rounded-full p-2 hover:bg-gray-100 text-gray-700  transition duration-300 border dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={handleWishlist}
              />
            )}
          </div>
        </div>
      </div>
      <p className="text-red-500 text-[0.65rem] font-bold text-center mt-2">
        {product.stock === 0 && "Out of stock"}
      </p>
    </div>
  );
};
