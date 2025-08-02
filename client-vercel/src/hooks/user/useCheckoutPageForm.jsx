import { useDispatch } from "react-redux";
import { updateUserAsync } from "../../redux";
import { useFormContext } from "react-hook-form";

export default function useCheckoutPageForm(
  setSelectedAddress,
  setpaymentMethod,
  user
) {
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
  return { handleAddress, handlePayment, submitHandler };
}
