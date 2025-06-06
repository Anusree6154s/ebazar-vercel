import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartIDB,
  existsInCartIDB,
  removeFromCartIDB,
} from "../../indexedDB/cartDB";
import {
  addCartItemIDB,
  addToWishListAsync,
  deleteItemFromWishListAsync,
  removeCartItemIDB,
} from "../../redux";
import { selectCartItems } from "../../redux";

export default function useCart(product, user) {
  const isLoggedIn = !!user;
  const cart = useSelector(selectCartItems);
  const [isProductInCart, setIsProductInCart] = useState(false);

  const toggleCartIcon = () => {
    let localCartHasProduct, remoteCartHasProduct;
    if (isLoggedIn) {
      remoteCartHasProduct = cart.some((item) => item.id === product.id);
    } else {
      const checkProductInCart = async () => await existsInCartIDB(product.id);
      localCartHasProduct = checkProductInCart();
    }
    setIsProductInCart(localCartHasProduct || remoteCartHasProduct);
  };

  useEffect(() => {
    console.log("user", user);
    toggleCartIcon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const handleCart = useCallback(() => {
    const toggleProductInLocalCart = async () => {
      try {
        const localCartHasProduct = await existsInCartIDB(product.id);
        if (localCartHasProduct) {
          await removeFromCartIDB(product.id);
          dispatch(removeCartItemIDB(product.id));
          setIsProductInCart(false);
        } else {
          await addToCartIDB(product);
          dispatch(addCartItemIDB({ product }));
          setIsProductInCart(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const toggleProductInRemoteCart = () => {
      const isProductInCart = cart.some((item) => item === product);
      if (isProductInCart) {
        dispatch(addToWishListAsync({ product: product.id, user: user.id }));
      } else {
        dispatch(deleteItemFromWishListAsync(product.id));
      }
    };

    if (!isLoggedIn) toggleProductInLocalCart();
    else toggleProductInRemoteCart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handleCart, isProductInCart };
}
