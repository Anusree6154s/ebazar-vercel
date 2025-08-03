import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import NavbarLayout from "./NavbarLayout";
import ProtectedLayout from "./ProtectedLayout";
import {
  ErrorFallbackPage,
  ProductListPage,
  WishListPage,
  CartPage,
  CheckoutPage,
  NotFoundPage,
  LoginPage,
  SignupPage,
  LogoutPage,
  ForgotPasswordPage,
  OrderSuccessPage,
  UserOrdersPage,
  UserProfilePage,
  AdminProductDetailPage,
  AddProductFormPage,
  EditProductFormPage,
  AdminOrdersPage,
  AdminProfilePage,
  StripePaymentPage,
  AdminProductListPage,
  ProductDetailPage,
} from "../pages";
import { pathnames } from "./pathnames";

export const router = createBrowserRouter([
  {
    path: pathnames.HOME,
    element: <RootLayout />,
    errorElement: <ErrorFallbackPage />,
    children: [
      {
        element: <NavbarLayout />,
        children: [
          {
            index: true,
            element: <ProductListPage />,
          },
          {
            path: pathnames.PRODUCT_DETAIL,
            element: <ProductDetailPage />,
          },
          {
            path: pathnames.WISHLIST,
            element: <WishListPage />,
          },
          {
            path: pathnames.CART,
            element: <CartPage />,
          },

          {
            path: pathnames.CHECKOUT,
            element: <CheckoutPage />,
          },
          {
            path: pathnames.NOT_FOUND,
            element: <NotFoundPage />,
          },
        ],
      },

      {
        path: pathnames.LOGIN,
        element: <LoginPage />,
      },
      {
        path: pathnames.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: pathnames.LOGOUT,
        element: <LogoutPage />,
      },
      {
        path: pathnames.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: pathnames.ORDER_SUCCESS,
        element: <OrderSuccessPage />,
      },
      {
        element: <NavbarLayout />,
        children: [
          {
            path: pathnames.MY_ORDERS,
            element: <UserOrdersPage />,
          },
          {
            path: pathnames.PROFILE,
            element: <UserProfilePage />,
          },
          {
            path: pathnames.ADMIN_PRODUCT_DETAIL,
            element: <AdminProductDetailPage />,
          },
          {
            path: pathnames.ADMIN_PRODUCT_FORM,
            element: <AddProductFormPage />,
          },
          {
            path: pathnames.ADMIN_EDIT_PRODUCT_FORM,
            element: <EditProductFormPage />,
          },
          {
            path: pathnames.ADMIN_ORDERS,
            element: <AdminOrdersPage />,
          },
          {
            path: pathnames.ADMIN_PROFILE,
            element: <AdminProfilePage />,
          },
          {
            path: pathnames.STRIPE_PAYMENT,
            element: <StripePaymentPage />,
          },
          {
            path: pathnames.ADMIN,
            element: <AdminProductListPage />,
          },
        ],
      },
    ],
  },
]);
