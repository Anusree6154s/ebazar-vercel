import React from "react";

export default function SelectAddressFormSection({
  user,
  handleAddress,
  selectedAddress,
}) {
  if (!user?.addresses?.length) return null;

  return (
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
              className=" flex justify-between items-baseline border-[1.5px] px-5 group cursor-pointer border-gray-200 rounded-md hover:border-customBlue"
              onClick={() => handleAddress(address)}
            >
              <div className=" flex items-baseline gap-5 ">
                <input
                  type="radio"
                  name="address"
                  checked={
                    JSON.stringify(address) === JSON.stringify(selectedAddress)
                  }
                  value={JSON.stringify(address)}
                  onChange={() => handleAddress(address)}
                  className="cursor-pointer  border-gray-300 dark:border-gray-600 text-customBlue focus:ring-customBlue dark:bg-gray-800 dark:hover:bg-blue-600 dark:text-blue-500 dark:focus:ring-blue-600"
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
  );
}
