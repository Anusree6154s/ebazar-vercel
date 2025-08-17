import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { useCheckoutPageForm } from "../../../hooks";
import SelectAddressFormSection from "./SelectAddressForm";
import SelectPaymentFormSection from "./SelectPaymentForm";

const CheckoutPageForm = (
  { addressRef, user, selectedAddress, setSelectedAddress, setpaymentMethod },
  ref
) => {
  const { handleSubmit, register } = useFormContext();
  const {
    submitHandler,
    handleAddress,
    handlePayment,
  } = useCheckoutPageForm(setSelectedAddress, setpaymentMethod, user);

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

          <div className="mt-10 grid grid-cols-1 sm:gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full md:col-span-3 lg:col-span-full">
              <label
                htmlFor="full-name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Full name
              </label>
              <div className="mt-2" ref={addressRef}>
                <input
                  type="text"
                  {...register("name", { required: "required" })}
                  id="full-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800 focus-visible:outline-none"
                />
              </div>
            </div>

            <div className="col-span-full md:col-span-3 lg:col-span-full">
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
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800 focus-visible:outline-none"
                />
              </div>
            </div>

            <div className="col-span-3 md:col-span-2 lg:col-span-3">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Street
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("street", { required: "required" })}
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800 focus-visible:outline-none"
                />
              </div>
            </div>

            <div className="col-span-3 md:col-span-2 lg:col-span-3">
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
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800 focus-visible:outline-none"
                />
              </div>
            </div>

            <div className="col-span-3 md:col-span-2 lg:col-span-3">
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
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800 focus-visible:outline-none"
                />
              </div>
            </div>

            <div className="col-span-3 md:col-span-2 lg:col-span-3">
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
                  className="block w-full rounded-md border-0 py-1.5 px-3 mr-6 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800 focus-visible:outline-none"
                >
                  <option>India</option>
                  <option>China</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-3 md:col-span-2 lg:col-span-3">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Pin code
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register("pincode", { required: "required" })}
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800 focus-visible:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield]"
                />
              </div>
            </div>

            <div className="col-span-3 md:col-span-2 lg:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register("phone", { required: "required" })}
                  id="phone"
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue  dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800 focus-visible:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield]"
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
            className="rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-80 dark:bg-opacity-100 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-customBlue focus-visible:outline-none"
          >
            Add Address
          </button>
        </div>

        <div className="mt-10 space-y-10">
          <SelectAddressFormSection
            user={user}
            handleAddress={handleAddress}
            selectedAddress={selectedAddress}
          />
          <SelectPaymentFormSection handlePayment={handlePayment} />
        </div>
      </div>
    </form>
  );
};

export default forwardRef(CheckoutPageForm);
