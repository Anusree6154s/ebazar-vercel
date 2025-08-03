import { SnackbarProvider } from "notistack";
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
  isWishListIDBEmptyAsync,
  selectIsWishlistIDBEmpty,
  selectLoggedInUser,
} from "./redux";
import { router } from "./routes/router";
import "./styles/App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const isWishlistIDBEmpty = useSelector(selectIsWishlistIDBEmpty);

  useEffect(() => {
    if (user && !user.error) {
      dispatch(isWishListIDBEmptyAsync());

      dispatch(fetchCartByUserIdAsync());
      dispatch(fetchWishListByUserIdAsync());

      if (isWishlistIDBEmpty) {
        // dispatch(moveWishListFromIDBToRemoteAsync);
      }
    } else {
      dispatch(fetchWishListIDBAsync());
      dispatch(fetchCartIDBAsync());
    }
  }, [user, dispatch, isWishlistIDBEmpty]);

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
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
    // </div>
  );
}

export default App;
