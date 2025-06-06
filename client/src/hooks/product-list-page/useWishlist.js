import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    addToWishListAsync,
    addWishlistItemIDB,
    deleteItemFromWishListAsync,
    removeWishlistItemIDB,
} from "../../redux";
import {
    addToWishlistIDB,
    existsInWishlistIDB,
    removeFromWishlistIDB,
} from "../../indexedDB/wishlistDB";
import { selectWishList } from "../../redux";

export default function useWishlist(product, user) {
  const isLoggedIn = !!user;
  const wishList = useSelector(selectWishList);
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);

  const toggleHeartIcon = () => {
    let localWishlistHasProduct, remoteWishlistHasProduct;
    if (isLoggedIn) {
      remoteWishlistHasProduct = wishList.some(
        (item) => item.id === product.id
      );
    } else {
      const checkProductInWishlist = async () =>
        await existsInWishlistIDB(product.id);
      localWishlistHasProduct = checkProductInWishlist();
    }
    setIsProductInWishlist(localWishlistHasProduct || remoteWishlistHasProduct);
  };

  useEffect(() => {
    // console.log("user", user);
    toggleHeartIcon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const handleWishlist = useCallback(() => {
    const toggleProductInLocalWishlist = async () => {
      try {
        const localWishlistHasProduct = await existsInWishlistIDB(product.id);
        if (localWishlistHasProduct) {
          await removeFromWishlistIDB(product.id);
          dispatch(removeWishlistItemIDB(product.id));
          setIsProductInWishlist(false);
        } else {
          await addToWishlistIDB(product);
          dispatch(addWishlistItemIDB({ product }));
          setIsProductInWishlist(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const toggleProductInRemoteWishlist = () => {
      const isProductInWishlist = wishList.some((item) => item === product);
      if (isProductInWishlist) {
        dispatch(addToWishListAsync({ product: product.id, user: user.id }));
      } else {
        dispatch(deleteItemFromWishListAsync(product.id));
      }
    };

    if (!isLoggedIn) toggleProductInLocalWishlist();
    else toggleProductInRemoteWishlist();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handleWishlist, isProductInWishlist };
}
