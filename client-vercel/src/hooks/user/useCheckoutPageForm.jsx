import { useDispatch } from "react-redux";
import { updateUserAsync } from "../../redux";
import { useFormContext } from "react-hook-form";
import { useRef } from "react";

export default function useCheckoutPageForm(
  setSelectedAddress,
  setpaymentMethod,
  user
) {
  const inputRef = useRef(null);
  const { reset } = useFormContext();
  const dispatch = useDispatch();
  const handleAddress = (address) => setSelectedAddress(address);
  const handlePayment = (e) => setpaymentMethod(e.target.value);
  const submitHandler = (data) => {
    dispatch(
      updateUserAsync({
        ...user,
        addresses: [...user.addresses, data],
      })
    );
    reset();
  };

  const preventScrollAndArrows = (e) => {
    // Prevent number changing on scroll
    if (e.type === "wheel") {
      e.preventDefault();
    }

    // Prevent number changing with ↑ / ↓ keys
    if (
      e.type === "keydown" &&
      (e.key === "ArrowUp" || e.key === "ArrowDown")
    ) {
      e.preventDefault();
    }
  };
  return {
    handleAddress,
    handlePayment,
    submitHandler,
    inputRef,
    preventScrollAndArrows,
  };
}
