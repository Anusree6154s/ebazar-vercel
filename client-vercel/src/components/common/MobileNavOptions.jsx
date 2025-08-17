import { DisclosureButton } from "@headlessui/react";
import {
  Bars3Icon,
  HeartIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectLoggedInUser,
  selectWishListLength,
} from "../../redux";

export default function MobileNavOptions({ handleTheme, dark, open }) {
  const user = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const wishlistItemsLength = useSelector(selectWishListLength);

  return (
    <div className="-mr-2 flex items-center gap-3 md:hidden">
      <button
        id="theme-toggle"
        onClick={handleTheme}
        type="button"
        className="flex items-center text-gray-500 dark:text-gray-400  hover:text-gray-100 dark:hover:text-gray-100 focus:outline-none focus:ring-4 focus:ring-transparent rounded-lg text-sm p-2.5 dark:border-gray-600"
      >
        <span className="hidden sm:inline">{dark ? "Light Mode" : "Dark Mode"}</span>
        <svg
          id="theme-toggle-dark-icon"
          className={`${dark ? "hidden" : ""}  w-5 h-5 sm:ml-2`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg
          id="theme-toggle-light-icon"
          className={`${dark ? "" : "hidden"}  w-5 h-5 sm:ml-2`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      {user && (
        <Link
          to="/wishlist"
          // className={user.role === "user" ? "" : "hidden"}
        >
          <button
            type="button"
            className=" rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-transparent  dark:bg-gray-900 dark:text-gray-400  dark:hover:text-gray-100  "
          >
            <span className="sr-only">View WishList</span>
            <HeartIcon className="h-6 w-6" aria-hidden="true" />
            {wishlistItemsLength > 0 && (
              <span className="absolute items-center rounded-md bg-pink-50 -mt-10 px-2 py-1 text-xs font-medium text-pink-500 ring-1 ring-inset ring-pink-600/10 ">
                {wishlistItemsLength}
              </span>
            )}
          </button>
        </Link>
      )}

      <Link
        to={cartItems.length > 0 ? "/cart" : "#"}
        // className={user.role === "user" ? "" : "hidden"}
      >
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-transparent  dark:bg-gray-900 dark:text-gray-400  dark:hover:text-gray-100 "
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View cart</span>
          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
          {cartItems.length > 0 && (
            <span className="absolute items-center rounded-md bg-blue-50 -mt-10 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10">
              {cartItems.length}
            </span>
          )}
        </button>
      </Link>
      <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open main menu</span>
        {open ? (
          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
        )}
      </DisclosureButton>
    </div>
  );
}
