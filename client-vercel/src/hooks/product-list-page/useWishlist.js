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
  const [productInWishlist, setProductInWishlist] = useState(false);
  
  const toggleHeartIcon = useCallback(async () => {
    const wishlistItem = await wishList.find((item) =>
      isLoggedIn ? item.product.id === product.id : item.id === product.id
    );
    setProductInWishlist(wishlistItem);
  }, [product.id, wishList, isLoggedIn]);

  useEffect(() => {
    toggleHeartIcon();
  }, [toggleHeartIcon]);

  const dispatch = useDispatch();
  const handleWishlist = useCallback(
    (itemInWishlist) => {
      const toggleProductInLocalWishlist = async () => {
        if (itemInWishlist) {
          dispatch(deleteItemFromWishListIDBAsync(itemInWishlist.id));
          setProductInWishlist(null);
        } else {
          dispatch(addToWishListIDBAsync(product));
          setProductInWishlist(itemInWishlist);
        }
      };
      
      const toggleProductInRemoteWishlist = () => {
        if (itemInWishlist) {
          dispatch(deleteItemFromWishListAsync(itemInWishlist.id));
          setProductInWishlist(null);
        } else {
          dispatch(addToWishListAsync({ product: product.id, user: user.id }));
          setProductInWishlist(itemInWishlist);
        }
      };

      if (!isLoggedIn) toggleProductInLocalWishlist();
      else toggleProductInRemoteWishlist();
    },
    [dispatch, isLoggedIn, product, user]
  );

  return { handleWishlist, productInWishlist };
}
