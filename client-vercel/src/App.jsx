import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { CustomSnackbar } from "./components";
import {
  checkAuthAsync,
  fetchCartByUserIdAsync,
  fetchCartIDBAsync,
  fetchLoggedInUserAsync,
  fetchWishListByUserIdAsync,
  fetchWishListIDBAsync,
  selectLoggedInUser,
} from "./redux";
import { router } from "./routes/router";
import "./styles/App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user && !user.error) {
      dispatch(fetchCartByUserIdAsync());
      dispatch(fetchWishListByUserIdAsync());
    } else {
      dispatch(fetchWishListIDBAsync());
      dispatch(fetchCartIDBAsync());
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
