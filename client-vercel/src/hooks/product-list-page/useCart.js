import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  addToCartIDBAsync,
  deleteItemFromCartAsync,
  deleteItemFromCartIDBAsync,
  selectCartItems,
  selectLoggedInUser,
} from "../../redux";

export default function useCart(product) {
  const user = useSelector(selectLoggedInUser);
  const isLoggedIn = !!user;
  const cart = useSelector(selectCartItems);
  const [productInCart, setProductInCart] = useState(false);

  const toggleCartIcon = useCallback(async () => {
    const productInCart = await cart.find((item) => {
      return isLoggedIn
        ? item.product.id === product.id
        : item.id === product.id;
    });
    setProductInCart(productInCart);
  }, [product.id, cart, isLoggedIn]);

  useEffect(() => {
    toggleCartIcon();
  }, [toggleCartIcon]);

  const dispatch = useDispatch();
  const handleCart = useCallback(
    (cartItem) => {
      if (!isLoggedIn) toggleProductInLocalCart();
      else toggleProductInRemoteCart();

      async function toggleProductInLocalCart() {
        if (cartItem) {
          dispatch(deleteItemFromCartIDBAsync(product.id));
          setProductInCart(null);
        } else {
          dispatch(addToCartIDBAsync(product));
          setProductInCart(true);
        }
      }

      async function toggleProductInRemoteCart() {
        if (cartItem) {
          dispatch(deleteItemFromCartAsync(cartItem.id));
          setProductInCart(null);
        } else {
          dispatch(
            addToCartAsync({ product: product.id, user: user.id, quantity: 1 })
          );
          setProductInCart(true);
        }
      }
    },
    [dispatch, isLoggedIn, product, user?.id]
  );

  return { handleCart, productInCart };
}
