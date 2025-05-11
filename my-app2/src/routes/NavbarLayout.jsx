import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components";

export default function NavbarLayout() {
  const location = useLocation();

  const pageTitles = {
    "/": "Products",
    "product-detail": null,
    wishlist: "Wishlist",
    cart: "Cart",
    checkout: "Checkout",
    admin: "Products",
    "admin/product-detail": null,
    "admin/product-form": "Add Product",
    "admin/edit-product-form": "Edit Product",
    "admin/orders": "Orders",
    "admin/profile": "Profile",
  };

  const keys = Object.keys(pageTitles).sort((a, b) => b.localeCompare(a));
  const key = keys.find((item) => location.pathname.includes(item));

  return (
    <Navbar name={pageTitles[key]}>
      <Outlet />
    </Navbar>
  );
};
