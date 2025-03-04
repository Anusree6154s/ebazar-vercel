import React, { useEffect } from "react";
import "./styles/App.css";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { router } from "./routes/Routes";
import { checkAuthAsync, fetchItemsByUserIdAsync, fetchWishListByUserIdAsync, selectLoggedInUser } from "./redux";
import { SnackbarProvider } from 'notistack'

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user && !user.error) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchWishListByUserIdAsync())
    }
  }, [user, dispatch]);

  useEffect(() => {
    // dispatch(fetchLoggedInUserAsync());
    dispatch(checkAuthAsync());
  }, [dispatch]);



  return (
    // <div className="dark:bg-gray-900">
      <SnackbarProvider maxSnack={1}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    // </div>
  );
}

export default App;
