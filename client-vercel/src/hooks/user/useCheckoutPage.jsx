import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import {
  createOrderAsync,
  resetCartAsync
} from "../../redux";

export default function useCheckoutPage(
  selectedAddress,
  addressRef,
  order,
  user
) {
  const dispatch = useDispatch();

  const handleOrder = () => {
    if (!selectedAddress) {
      addressRef.current.focus();
      enqueueSnackbar("Please enter your address before placing the order.", {
        variant: "error",
      });
      return;
    }

    dispatch(createOrderAsync(order));
    dispatch(resetCartAsync(user.id));
  };

  return { handleOrder };
}
