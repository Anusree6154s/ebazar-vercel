export function EditAddressForm({
  handleSubmit2,
  handleEdit,
  index,
  setVisibilityIndex,
  visibilityIndex,
  register2,
  errors2,
}) {
  return (
    <form
      noValidate
      onSubmit={handleSubmit2((data) => {
        handleEdit(data, index);
        setVisibilityIndex(null);
      })}
      className={visibilityIndex !== index ? "hidden" : "px-4 w-full"}
    >
      <div className="pt-6 border-b border-t border-gray-900/10 pb-12  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full lg:col-span-3">
          <label
            htmlFor="full-name"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Full name
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register2("name", {
                required: "required",
              })}
              id="full-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
            />
          </div>
          {errors2.name && <p className="text-red-500">* required</p>}
        </div>

        <div className="col-span-full lg:col-span-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...register2("email", {
                required: "required",
              })}
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-gray-300= ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
            />
          </div>
          {errors2.email && <p className="text-red-500">* required</p>}
        </div>

        <div className="cols-span-full md:col-span-3 lg:col-span-2">
          <label
            htmlFor="street"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Street address
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register2("street", {
                required: "required",
              })}
              id="street"
              autoComplete="street"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
            />
          </div>
          {errors2.street && <p className="text-red-500">* required</p>}
        </div>

        <div className="cols-span-full md:col-span-3 lg:col-span-2">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            City
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register2("city", {
                required: "required",
              })}
              id="city"
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
            />
          </div>
          {errors2.city && <p className="text-red-500">* required</p>}
        </div>

        <div className="cols-span-full md:col-span-3 lg:col-span-2">
          <label
            htmlFor="region"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            State
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register2("state", {
                required: "required",
              })}
              id="region"
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
            />
          </div>
          {errors2.state && <p className="text-red-500">* required</p>}
        </div>

        <div className="cols-span-full md:col-span-3 lg:col-span-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Country
          </label>
          <div className="mt-2">
            <select
              id="country"
              {...register2("country", {
                required: "required",
              })}
              autoComplete="country-name"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-gray-300  ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:bg-gray-800 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>India</option>
              <option>China</option>
              <option>Mexico</option>
            </select>
          </div>
        </div>

        <div className="cols-span-full md:col-span-3 lg:col-span-2">
          <label
            htmlFor="pincode"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Pin code
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register2("pincode", {
                required: "required",
              })}
              id="pincode"
              autoComplete="pincode"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield]"
            />
          </div>
          {errors2.pincode && <p className="text-red-500">* required</p>}
        </div>

        <div className="cols-span-full md:col-span-3 lg:col-span-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Phone
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register2("phone", {
                required: "required",
              })}
              id="phone"
              autoComplete="phone"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield]"
            />
          </div>
          {errors2.phone && <p className="text-red-500">* required</p>}
        </div>
      </div>

      <div className="my-6 ml-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => setVisibilityIndex(null)}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-semibold dark:text-gray-100 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-customBlue"
        >
          Save
        </button>
      </div>
    </form>
  );
}
