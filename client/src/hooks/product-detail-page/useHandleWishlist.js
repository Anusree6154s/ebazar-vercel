import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishListAsync,
  selectLoggedInUser,
  selectWishList,
} from "../../redux";

export const useHandleWishlist = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const wishList = useSelector(selectWishList);

  const handleWishList = () => {
    const productExistsInWishlist = wishList.some(
      (item) => item.product.title === product.title
    );
    console.log(product.id);

    if (productExistsInWishlist) {
      enqueueSnackbar("Already in Wishlist!", { variant: "AlreadyInWishlist" });
    } else {
      dispatch(addToWishListAsync({ product: product.id, user: user.id }));
      enqueueSnackbar("Added to Wishlist!", { variant: "AddedToWishlist" });
    }
  };

  return { handleWishList };
};
