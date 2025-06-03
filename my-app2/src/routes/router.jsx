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

export const router = createBrowserRouter([
  {
    path: "/",
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
            path: "product-detail/:id",
            element: <ProductDetailPage  />,
          },
          {
            path: "wishlist",
            element: <WishListPage />,
          },
          {
            path: "cart",
            element: <CartPage />,
          },

          {
            path: "checkout",
            element: <CheckoutPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },

      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "order-success/:id",
        element: <OrderSuccessPage />,
      },
      {
        element: <NavbarLayout />,
        children: [
          {
            path: "my-orders",
            element: <UserOrdersPage />,
          },
          {
            path: "profile",
            element: <UserProfilePage />,
          },
          {
            path: "/admin/product-detail/:id",
            element: <AdminProductDetailPage />,
          },
          {
            path: "/admin/product-form",
            element: <AddProductFormPage />,
          },
          {
            path: "/admin/edit-product-form/:id",
            element: <EditProductFormPage />,
          },
          {
            path: "/admin/orders",
            element: <AdminOrdersPage />,
          },
          {
            path: "/admin/profile",
            element: <AdminProfilePage />,
          },
          {
            path: "/stripe-payment/:id",
            element: <StripePaymentPage />,
          },
          {
            path: "/admin",
            element: <AdminProductListPage />,
          },
        ],
      },
    ],
  },
]);
