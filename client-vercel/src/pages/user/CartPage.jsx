import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import CartItem from "../../components/user/cart-page/CartItem";
import {
  selectCartItems,
  selectCartStatus,
  selectLoggedInUser,
} from "../../redux";
import { getTotalCartItemsCount } from "../../util/total-cart-items";
import { getTotalCartItemsPrice } from "../../util/total-cart-items-price";
import { pathnames } from "../../routes/pathnames";

function CartPage() {
  const items = useSelector(selectCartItems);
  const status = useSelector(selectCartStatus);
  const user = useSelector(selectLoggedInUser);
  const isLoggedIn = !!user;

  const totalPrice = getTotalCartItemsPrice(items, isLoggedIn);
  const totalItems = getTotalCartItemsCount(items);

  if (!items.length && status === "idle") return <Navigate to="/" replace />;
  return (
    <section id="cart">
      <BackButton path={pathnames.HOME} />

      <div className="flex flex-col bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex-1 px-4 py-6 sm:px-6 flow-root">
          <ul className="-my-6 divide-y divide-gray-200 dark:divide-gray-500">
            {items.map((item) => (
              <CartItem
                item={isLoggedIn ? item.product : item}
                key={item.id}
                quantity={item.quantity}
                itemId={isLoggedIn ? item.id : null}
              />
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600  px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base  font-medium text-gray-900 dark:text-gray-300">
            <p>Subtotal</p>
            <p>₹ {totalPrice}</p>
          </div>
          <div className="flex justify-between text-base my-4 font-medium text-gray-900 dark:text-gray-300">
            <p>Total number of Items</p>
            <p>{totalItems} Items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6 flex flex-col gap-3 justify-center text-center text-sm text-gray-500 dark:text-gray-300">
            <Link
              to={isLoggedIn ? "/checkout" : "/login"}
              className="flex items-center justify-center rounded-md border
              border-transparent bg-customBlue dark:bg-blue-600 px-6 py-3
              text-base font-medium text-white shadow-sm bg-opacity-80
              hover:bg-opacity-100 dark:bg-opacity-100 dark:hover:bg-opacity-80"
            >
              {isLoggedIn ? "Checkout" : "Login to Checkout"}
            </Link>
            <span>or</span>
            <Link to="/">
              <button
                type="button"
                className="font-medium text-customBlue dark:text-blue-400"
              >
                <span aria-hidden="true" className="mr-2 text-lg">
                  &larr;
                </span>
                Back to Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
