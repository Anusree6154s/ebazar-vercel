import { closeSnackbar, SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import {
  checkAuthAsync,
  fetchCartByUserIdAsync,
  fetchCartIDBAsync,
  fetchLoggedInUserAsync,
  fetchWishListByUserIdAsync,
  fetchWishListIDBAsync,
  isCartIDBEmptyAsync,
  isWishListIDBEmptyAsync,
  moveCartFromIDBToRemoteAsync,
  moveWishListFromIDBToRemoteAsync,
  selectIsCartIDBEmpty,
  selectIsWishlistIDBEmpty,
  selectLoggedInUser,
} from "./redux";
import { router } from "./routes/router";
import "./styles/App.css";
import { XMarkIcon } from "@heroicons/react/24/outline";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const isWishlistIDBEmpty = useSelector(selectIsWishlistIDBEmpty);
  const isCartIDBEmpty = useSelector(selectIsCartIDBEmpty);

  useEffect(() => {
    if (user && !user.error) {
      dispatch(isWishListIDBEmptyAsync());
      dispatch(isCartIDBEmptyAsync());
      dispatch(fetchCartByUserIdAsync());
      dispatch(fetchWishListByUserIdAsync());
    } else {
      dispatch(fetchWishListIDBAsync());
      dispatch(fetchCartIDBAsync());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user && !user.error && !isWishlistIDBEmpty) {
      dispatch(moveWishListFromIDBToRemoteAsync(user.id));
    }
  }, [user, isWishlistIDBEmpty, dispatch]);

  useEffect(() => {
    if (user && !user.error && !isCartIDBEmpty) {
      dispatch(moveCartFromIDBToRemoteAsync(user.id));
    }
  }, [user, isCartIDBEmpty, dispatch]);

  useEffect(() => {
    dispatch(fetchLoggedInUserAsync());
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return (
    // <div className="dark:bg-gray-900">
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={3000}
      action={(snackbarId) => (
        <button
          onClick={() => closeSnackbar(snackbarId)}
          className="p-1 text-white hover:text-gray-300"
          aria-label="close"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
    // </div>
  );
}

export default App;
