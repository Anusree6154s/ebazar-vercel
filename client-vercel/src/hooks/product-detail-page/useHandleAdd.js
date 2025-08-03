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
  
  const handleAdd = () => {
    console.log("🚀 ~ handleAdd ~ handleAdd:")
    console.log("🚀 ~ useHandleAdd ~ product:", product)
    const productInCart = cartItems.find(
      (item) => item.title === product.title,
    );
    console.log("🚀 ~ handleAdd ~ productInCart:", productInCart)

    if (product.stock !== 0) {
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
          }),
        );
      } else {
        dispatch(
          addToCartAsync({
            product: product.id,
            quantity: quantity,
            user: user.id,
          }),
        );
      }
      enqueueSnackbar("Added to Cart!", { variant: "AddedToCart" });
    }
  };

  return { handleAdd };
}
