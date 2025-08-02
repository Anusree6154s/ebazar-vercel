import React from "react";

export default function SelectPaymentFormSection({ handlePayment }) {
  return (
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
  );
}


