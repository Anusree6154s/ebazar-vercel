import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishListAsync,
  addToWishListIDBAsync,
  deleteItemFromWishListAsync,
  deleteItemFromWishListIDBAsync,
  selectWishList,
} from "../../redux";

export default function useWishlist(product, user) {
  const isLoggedIn = !!user;
  const wishList = useSelector(selectWishList);
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);

  const toggleHeartIcon = useCallback(async () => {
    const wishlistHasProduct = await wishList.some(
      (item) => item.id === product.id,
    );
    setIsProductInWishlist(wishlistHasProduct);
  }, [product.id, wishList]);

  useEffect(() => {
    toggleHeartIcon();
  }, [toggleHeartIcon]);

  const dispatch = useDispatch();
  const handleWishlist = useCallback((wishlistHasProduct) => {
    const toggleProductInLocalWishlist = async () => {
      if (wishlistHasProduct) {
        dispatch(deleteItemFromWishListIDBAsync(product.id));
        setIsProductInWishlist(false);
      } else {
        dispatch(addToWishListIDBAsync(product));
        setIsProductInWishlist(true);
      }
    };

    const toggleProductInRemoteWishlist = () => {
      if (wishlistHasProduct) {
        dispatch(deleteItemFromWishListAsync(product.id));
        setIsProductInWishlist(false);
      } else {
        dispatch(addToWishListAsync({ product: product.id, user: user.id }));
        setIsProductInWishlist(true);
      }
    };

    if (!isLoggedIn) toggleProductInLocalWishlist();
    else toggleProductInRemoteWishlist();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handleWishlist, isProductInWishlist };
}
