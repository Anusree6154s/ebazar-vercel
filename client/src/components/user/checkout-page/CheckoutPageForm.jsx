import React, { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { useCheckoutPageForm } from "../../../hooks";

const CheckoutPageForm = ({
  addressRef,
  user,
  selectedAddress,
  setSelectedAddress,
  setpaymentMethod,
}, ref) => {
  const { handleSubmit, register } = useFormContext();
  const { submitHandler, handleAddress, handlePayment } = useCheckoutPageForm(
    setSelectedAddress,
    setpaymentMethod,
    user
  );

  return (
    <form ref={ref} noValidate onSubmit={handleSubmit(submitHandler)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 dark:border-gray-700 pb-12">
          <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-300">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="full-name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name", { required: "required" })}
                  ref={addressRef}
                  id="full-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required: "required" })}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  {...register("country", { required: "required" })}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
                >
                  <option>India</option>
                  <option>China</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("street", { required: "required" })}
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("city", { required: "required" })}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                State
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("state", { required: "required" })}
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Pin code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("pincode", { required: "required" })}
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("phone", { required: "required" })}
                  id="phone"
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-80 dark:bg-opacity-100 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-customBlue"
          >
            Add Address
          </button>
        </div>

        <div className="mt-10 space-y-10">
          {user.addresses.length !== 0 && (
            <fieldset>
              <legend className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-300">
                Address
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Choose from existing addresses
              </p>
              <div className="mt-6 space-y-6">
                <ul key="0" className="flex flex-col gap-2">
                  {user.addresses.map((address, index) => (
                    <li
                      key={index}
                      className=" flex justify-between items-baseline border px-5 group cursor-pointer"
                      onClick={() => handleAddress(address)}
                    >
                      <div className=" flex items-baseline gap-5 ">
                        <input
                          type="radio"
                          name="address"
                          checked={
                            JSON.stringify(address) ===
                            JSON.stringify(selectedAddress)
                          }
                          value={JSON.stringify(address)}
                          className="border-gray-300 dark:border-gray-600 text-customBlue focus:ring-customBlue dark:bg-gray-800 dark:hover:bg-blue-600 dark:text-blue-500 dark:focus:ring-blue-600"
                        />
                        <label
                          htmlFor=""
                          className="flex justify-between gap-x-6 py-5  cursor-pointer"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">
                                {address.street}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">
                                {address.city}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">
                                {address.pincode}
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900 dark:text-gray-300">
                          {address.phone}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </fieldset>
          )}
          <fieldset>
            <legend className=" font-semibold leading-7 text-gray-900 dark:text-gray-300 text-lg">
              Payment
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Choose One
            </p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  onChange={(e) => handlePayment(e)}
                  defaultChecked="true"
                  value="cash"
                  id="cash"
                  name="payment"
                  type="radio"
                  className="h-4 w-4 border-gray-300 dark:border-gray-600 text-customBlue focus:ring-customBlue dark:bg-gray-800 dark:hover:bg-blue-600 dark:text-blue-500 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="push-everything"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
                >
                  Cash
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  onChange={(e) => handlePayment(e)}
                  value="card"
                  id="card-payment"
                  name="payment"
                  type="radio"
                  className="h-4 w-4 border-gray-300 dark:border-gray-600 text-customBlue focus:ring-customBlue dark:bg-gray-800 dark:hover:bg-blue-600 dark:text-blue-500 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="push-email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
                >
                  Card Payment
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </form>
  );
}

export default forwardRef(CheckoutPageForm)