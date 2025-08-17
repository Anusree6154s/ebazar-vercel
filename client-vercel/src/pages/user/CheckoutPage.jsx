import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useCheckoutPage from "../../hooks/user/useCheckoutPage";
import {
  selectCartItems,
  selectCurrentOrder,
  selectLoggedInUser,
} from "../../redux";
import { getFormattedDate } from "../../util/format-date";
import { getTotalCartItemsCount } from "../../util/total-cart-items";
import { getTotalCartItemsPrice } from "../../util/total-cart-items-price";
import {
  BackButton,
  CheckoutPageCartList,
  CheckoutPageForm,
} from "../../components";

function CheckoutPage() {
  const methods = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  console.log("🚀 ~ CheckoutPage ~ items:", items);
  const user = useSelector(selectLoggedInUser);
  const isLoggedIn = !!user;
  const currentOrder = useSelector(selectCurrentOrder);
  const [selectedAddress, setSelectedAddress] = useState(
    user.addresses[0] || null
  );
  const [paymentMethod, setpaymentMethod] = useState("cash");
  const addressRef = useRef();

  const totalPrice = getTotalCartItemsPrice(items, isLoggedIn);
  const totalItems = getTotalCartItemsCount(items);
  const order = {
    items,
    totalPrice,
    totalItems,
    user: user.id,
    email: user.email,
    selectedAddress,
    paymentMethod,
    status: "Pending",
    date: getFormattedDate(new Date()),
  };

  const { handleOrder } = useCheckoutPage(
    selectedAddress,
    addressRef,
    order,
    user
  );

  if (currentOrder) {
    switch (currentOrder.paymentMethod) {
      case "cash":
        return navigate(`/order-success/${currentOrder.id}`, { replace: true });
      case "card":
        return navigate(`/stripe-payment/${currentOrder.id}`, {
          replace: true,
        });
      default:
        break;
    }
  }

  return (
    <>
      <BackButton />

      {user && (
        <div className=" grid gap-10 max-w-7xl  lg:grid-cols-5">
          <div className="lg:col-span-3 px-4 py-6 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
            <FormProvider {...methods}>
              <CheckoutPageForm
                addressRef={addressRef}
                user={user}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                setpaymentMethod={setpaymentMethod}
              />
            </FormProvider>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white px-4 sm:px-6 lg:px-8 dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-800 flex flex-col">
              <ul
                key="1"
                className="divide-y divide-gray-200 dark:divide-gray-500"
              >
                {items.length ? (
                  items.map((item) => (
                    <CheckoutPageCartList
                      item={isLoggedIn ? item.product : item}
                      key={item.id}
                      quantity={item.quantity}
                      itemId={isLoggedIn ? item.id : null}
                    />
                  ))
                ) : (
                  <p className="p-4 text-center dark:text-gray-400">
                    No Items to Order
                  </p>
                )}
              </ul>

              <div className="border-t border-gray-200  dark:border-gray-400 py-4">
                {items.length > 0 && (
                  <>
                    <div className="flex justify-between text-base  font-medium text-gray-900 dark:text-gray-300">
                      <p>Subtotal</p>
                      <p>₹ {totalPrice}</p>
                    </div>
                    <div className="flex justify-between text-base my-4 font-medium text-gray-900 dark:text-gray-300">
                      <p>Total number of Items</p>
                      <p>{totalItems} Items</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-300">
                      Shipping and taxes calculated at checkout.
                    </p>
                  </>
                )}
                <div className="mt-6 flex flex-col justify-center text-center text-sm text-gray-500 dark:text-gray-300">
                  <Link
                    onClick={items.length ? handleOrder : undefined}
                    className={`flex  items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm ${
                      items.length>0
                        ? "bg-customBlue cursor-pointer dark:bg-blue-500 hover:bg-opacity-100 dark:hover:bg-blue-600 bg-opacity-80"
                        : "bg-gray-400"
                    }`}
                  >
                    Order Now
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
          </div>
        </div>
      )}
    </>
  );
}

export default CheckoutPage;
