import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartAsync, selectLoggedInUser } from "../redux";

export const useHandleBuy = ({ quantity, product }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const handleBuy = () => {
    if (product.stock !== 0) {
      dispatch(
        addToCartAsync({
          product: product.id,
          quantity: quantity,
          user: user.id,
        })
      );
      navigate("/checkout");
    }
  };
  return { handleBuy };
};
