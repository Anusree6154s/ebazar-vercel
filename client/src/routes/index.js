import { createBrowserRouter, Outlet } from "react-router-dom";
import { ForgotPassword, Logout, PageNotFound } from "../components";
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
  LoginPage,
  OrderSuccessPage,
  ProductDetailPage,
  ProductListPage,
  SignupPage,
  StripePaymentPage,
  UserOrdersPage,
  UserProfilePage,
  WishListPage,
} from "../pages";
import { NavbarLayout } from "./NavbarLayout";
import { ProtectedLayout } from "./ProtectedLayout";

function RootLayout() {
  // Renders the matched child route
  return <Outlet />;
}

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
        element: <Logout />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
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
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
