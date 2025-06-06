import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useCheckoutPage from "../../hooks/user/useCheckoutPage";
import {
  selectCartItems,
  selectCurrentOrder,
  selectLoggedInUser,
} from "../../redux";
import { getFormattedDate } from "../../util/format-date";
import { getTotalCartItemsCount } from "../../util/total-cart-items";
import { getTotalCartItemsPrice } from "../../util/total-cart-items-price";
import { BackButton, CheckoutPageCartList, CheckoutPageForm } from "../../components";


function CheckoutPage() {
  const methods = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const user = useSelector(selectLoggedInUser);
  const currentOrder = useSelector(selectCurrentOrder);
  const [selectedAddress, setSelectedAddress] = useState(
    user.addresses[0] || null
  );
  const [paymentMethod, setpaymentMethod] = useState("cash");
  const addressRef = useRef();

  const totalPrice = getTotalCartItemsPrice(items);
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

          <div className="lg:col-span-2 ">
            <div className="bg-white px-4 sm:px-6 lg:px-8 dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-800">
              <div className="flex flex-col max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex-1 px-4 py-6 sm:px-6 flow-root">
                  <ul
                    key="1"
                    className="-my-6 divide-y divide-gray-200 dark:divide-gray-500"
                  >
                    {items.map((item) => (
                      <CheckoutPageCartList item={item} key={item.id} />
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200  dark:border-gray-400  px-4 py-6 sm:px-6">
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
                  <div className="mt-6">
                    <Link
                      onClick={handleOrder}
                      className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-customBlue dark:bg-blue-500 px-6 py-3 text-base font-medium text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600"
                    >
                      Order Now
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-300">
                    <p>
                      or{" "}
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-customBlue hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
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
