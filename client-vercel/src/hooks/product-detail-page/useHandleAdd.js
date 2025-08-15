import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  selectCartItems,
  selectLoggedInUser,
  updateCartAsync,
} from "../../redux";

export default function useHandleAdd({ quantity, product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectLoggedInUser);
  const isLoggedIn = !!user;

  const handleAdd = () => {
    const productInCart = cartItems.find((item) =>
      isLoggedIn
        ? item.product.title === product.title
        : item.title === product.title
    );

    if (product.stock == 0) return;

    if (isLoggedIn) addToCartRemote();
    else addToCartIDB();

    enqueueSnackbar("Added to Cart!", { variant: "success" });

    function addToCartRemote() {
      if (productInCart) {
        const newQuantity =
          productInCart.quantity + quantity <= 4
            ? productInCart.quantity + quantity
            : productInCart.quantity;
        dispatch(
          updateCartAsync({
            ...productInCart,
            product: productInCart.product.id,
            quantity: newQuantity,
          })
        );
      } else {
        dispatch(
          addToCartAsync({
            product: product.id,
            quantity: quantity,
            user: user.id,
          })
        );
      }
    }

    function addToCartIDB() {}
  };
  `1`;

  return { handleAdd };
}
