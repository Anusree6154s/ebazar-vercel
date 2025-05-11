import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  AddProductFormPage,
  AdminOrdersPage,
  AdminProductDetailPage,
  AdminProductListPage,
  AdminProfilePage,
  CartPage,
  CheckoutPage,
  EditProductFormPage,
  ErrorFallbackPage,
  ForgotPasswordPage,
  LoginPage,
  LogoutPage,
  NotFoundPage,
  OrderSuccessPage,
  ProductDetailPage,
  ProductListPage,
  SignupPage,
  StripePaymentPage,
  UserOrdersPage,
  UserProfilePage,
  WishListPage,
} from "../pages";
import RootLayout from "./RootLayout";

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
            element: <ProductDetailPage />,
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
