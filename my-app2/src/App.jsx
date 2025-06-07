import { SnackbarProvider } from "notistack";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { CustomSnackbar } from "./components";
import { getCartItemsIDB } from "./indexedDB/cartDB";
import {
  checkAuthAsync,
  fetchItemsByUserIdAsync,
  fetchLoggedInUserAsync,
  fetchWishListByUserIdAsync,
  fetchWishListIDBAsync,
  selectLoggedInUser,
  setCartItemsIDB,
} from "./redux";
import { router } from "./routes/router";
import "./styles/App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  // const fetchWishlistItemsIDB = useCallback(async () => {
  //   try {
  //     const wishlistItems = await getWishlistItemsIDB();
  //     dispatch(setWishlistItemsIDB(wishlistItems));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [dispatch]);

  const fetchCartItemsIDB = useCallback(async () => {
    try {
      const cartItems = await getCartItemsIDB();
      dispatch(setCartItemsIDB(cartItems));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && !user.error) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchWishListByUserIdAsync());
    } else {
      // dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchWishListIDBAsync());
      // fetchWishlistItemsIDB();
      // fetchCartItemsIDB();
    }
  }, [user, dispatch, fetchCartItemsIDB]);

  useEffect(() => {
    dispatch(fetchLoggedInUserAsync());
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return (
    // <div className="dark:bg-gray-900">
    <SnackbarProvider
      maxSnack={1}
      Components={{
        AddToWishlist: CustomSnackbar,
        RemoveFromWishlist: CustomSnackbar,
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
    // </div>
  );
}

export default App;
