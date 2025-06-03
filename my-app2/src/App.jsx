import { useEffect } from "react";
import "./styles/App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthAsync,
  fetchItemsByUserIdAsync,
  fetchLoggedInUserAsync,
  fetchWishListByUserIdAsync,
  selectLoggedInUser,
  setWishlistItemsIDB,
} from "./redux";
import { getWishlistItemsIDB } from "./indexedDB/wishlistDB";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import { CustomSnackbar } from "./components";
import { router } from "./routes/router";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  console.log(user);
  useEffect(() => {
    if (user && !user.error) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchWishListByUserIdAsync());
    } else {
      const fetchWishlistItemsIDB = async () => {
        try {
          const wishlistItems = await getWishlistItemsIDB();
          dispatch(setWishlistItemsIDB(wishlistItems));
        } catch (error) {
          console.error(error);
        }
      };
      fetchWishlistItemsIDB();
    }
  }, [user, dispatch]);

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
