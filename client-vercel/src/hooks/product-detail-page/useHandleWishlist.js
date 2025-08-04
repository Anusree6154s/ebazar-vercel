import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishListAsync,
  addToWishListIDBAsync,
  selectLoggedInUser,
  selectWishList,
} from "../../redux";

export default function useHandleWishlist({ product }) {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const wishList = useSelector(selectWishList);

  const isLoggedIn = !!user;

  const handleWishList = () => {
    const productExistsInWishlist = wishList.some(
      (item) => item.title === product.title
    );

    if (productExistsInWishlist) {
      enqueueSnackbar("Already in Wishlist!", {
        variant: "info",
      });
      return;
    }

    if (!isLoggedIn) {
      // local wishlist
      dispatch(addToWishListIDBAsync(product));
    } else {
      // remote wishlist
      dispatch(addToWishListAsync({ product: product.id, user: user.id }));
    }
    enqueueSnackbar("Added to Wishlist!", {
      variant: "success",
    });
  };

  return { handleWishList };
}
