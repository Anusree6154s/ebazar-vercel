import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartIDB,
  existsInCartIDB,
  removeFromCartIDB,
} from "../../indexedDB/cartDB";
import {
  addCartItemIDB,
  removeCartItemIDB,
  selectCartItems,
} from "../../redux";

export default function useCart(product, user) {
  const isLoggedIn = !!user;
  const cart = useSelector(selectCartItems);
  const [isProductInCart, setIsProductInCart] = useState(false);

  const toggleCartIcon = async () => {
    let localCartHasProduct, remoteCartHasProduct;
    if (isLoggedIn) {
      remoteCartHasProduct = await cart.some((item) => item.id === product.id);
    } else {
      localCartHasProduct = await existsInCartIDB(product.id);
    }
    setIsProductInCart(localCartHasProduct || remoteCartHasProduct);
  };

  useEffect(() => {
    toggleCartIcon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const handleCart = useCallback(() => {
    if (!isLoggedIn) toggleProductInLocalCart();
    else toggleProductInRemoteCart();

    async function toggleProductInLocalCart() {
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
    }

    async function toggleProductInRemoteCart() {
      const isProductInCart = cart.some((item) => item === product);
      console.log("🚀 ~ toggleProductInRemoteCart ~ product:", product);
      console.log(
        "🚀 ~ toggleProductInRemoteCart ~ isProductInCart:",
        isProductInCart,
      );
      if (isProductInCart) {
        dispatch(addCartItemIDB({ product }));
      } else {
        dispatch(removeCartItemIDB(product.id));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handleCart, isProductInCart };
}
