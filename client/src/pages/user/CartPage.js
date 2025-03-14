import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import CartItem from "../../components/user/CartPage/CartItem";
import {
    selectCartStatus,
    selectItems
} from "../../redux";

function CartPage() {
  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const navigate = useNavigate();

  const totalPrice =
    items.length > 0
      ? Number(
          items
            .reduce(
              (amount, item) => item.product.price * item.quantity + amount,
              0
            )
            .toFixed(2)
        )
      : 0;

  const totalItems =
    items.length > 0
      ? items.reduce((amount, item) => item.quantity + amount, 0)
      : 0;

  if (!items.length && status === "idle") navigate("/", { replace: true });

  return (
    <section id="cart">
      <BackButton />

      <div className="flex flex-col bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex-1 px-4 py-6 sm:px-6 flow-root">
          <ul className="-my-6 divide-y divide-gray-200 dark:divide-gray-500">
            {items.map((item) => 
              <CartItem item={item} key={item.id}/>
            )}
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
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-customBlue dark:bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:bg-opacity-100 dark:hover:bg-opacity-80"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-300">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-customBlue dark:text-blue-400"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
