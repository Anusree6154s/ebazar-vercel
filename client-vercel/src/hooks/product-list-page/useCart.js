import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  addToCartIDBAsync,
  deleteItemFromCartAsync,
  deleteItemFromCartIDBAsync,
  selectCartItems,
} from "../../redux";

export default function useCart(product, user) {
  const isLoggedIn = !!user;
  const cart = useSelector(selectCartItems);
  const [isProductInCart, setIsProductInCart] = useState(false);

  const toggleCartIcon = useCallback(async () => {
    const cartHasProduct = await cart.some((item) => item.id === product.id);
    setIsProductInCart(cartHasProduct);
  }, [product.id, cart]);

  useEffect(() => {
    toggleCartIcon();
  }, [toggleCartIcon]);

  const dispatch = useDispatch();
  const handleCart = useCallback(
    (cartHasProduct) => {
      console.log("🚀 ~ useCart ~ cartHasProduct:", cartHasProduct);
      if (!isLoggedIn) toggleProductInLocalCart();
      else toggleProductInRemoteCart();

      async function toggleProductInLocalCart() {
        if (cartHasProduct) {
          dispatch(deleteItemFromCartIDBAsync(product.id));
          setIsProductInCart(false);
        } else {
          dispatch(addToCartIDBAsync(product));
          setIsProductInCart(true);
        }
      }

      async function toggleProductInRemoteCart() {
        if (cartHasProduct) {
          dispatch(deleteItemFromCartAsync(product.id));
          setIsProductInCart(false);
        } else {
          dispatch(addToCartAsync({ product }));
          setIsProductInCart(true);
        }
      }
    },
    [dispatch, isLoggedIn, product],
  );

  return { handleCart, isProductInCart };
}
