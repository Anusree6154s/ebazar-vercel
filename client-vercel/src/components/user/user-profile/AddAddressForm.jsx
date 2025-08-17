export function AddAddressForm({
  handleSubmit,
  handleAdd,
  setaddFormVisibility,
  addFormVisibility,
  register,
  errors,
}) {
  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        handleAdd(data);
        setaddFormVisibility(!addFormVisibility);
      })}
      className={addFormVisibility ? "bg-gray-50 px-10 py-1" : "hidden mt-6"}
    >
      <div className="pt-6 border-b border-gray-400 dark:border-gray-700 pb-12  grid gap-x-6 gap-y-8 grid-cols-6">
        <div className="col-span-full lg:col-span-3">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Full name
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register("name", { required: "required" })}
              id="name"
              autoComplete="name"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-gray-300  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 focus-visible:outline-none"
            />
          </div>
          {errors.name && <p className="text-red-500">* required</p>}
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
              {...register("email")}
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 px-4  text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 focus-visible:outline-none"
            />
          </div>
          {errors.email && <p className="text-red-500">* required</p>}
        </div>

        <div className="col-span-full md:col-span-3 lg:col-span-2">
          <label
            htmlFor="street"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Street
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register("street", { required: "required" })}
              id="street"
              autoComplete="address-level3"
              className="block w-full rounded-md border-0 py-1.5 px-4  text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 focus-visible:outline-none"
            />
          </div>
          {errors.street && <p className="text-red-500">* required</p>}
        </div>

        <div className="col-span-full md:col-span-3 lg:col-span-2">
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
              className="block w-full rounded-md border-0 py-1.5 px-4  text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 focus-visible:outline-none"
            />
          </div>
          {errors.city && <p className="text-red-500">* required</p>}
        </div>

        <div className="col-span-full md:col-span-3 lg:col-span-2">
          <label
            htmlFor="state"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            State
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register("state", { required: "required" })}
              id="state"
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 px-4  text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 focus-visible:outline-none"
            />
          </div>
          {errors.state && <p className="text-red-500">* required</p>}
        </div>

        <div className="col-span-full md:col-span-3 lg:col-span-2">
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
              autoComplete="country"
              className="block w-full rounded-md border-0 py-1.5 px-4  text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:bg-gray-800 sm:max-w-xs sm:text-sm sm:leading-6 focus-visible:outline-none"
            >
              <option>India</option>
              <option>China</option>
              <option>Mexico</option>
            </select>
          </div>
        </div>

        <div className="col-span-full md:col-span-3 lg:col-span-2">
          <label
            htmlFor="pincode"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Pin code
          </label>
          <div className="mt-2">
            <input
              type="number"
              {...register("pincode", { required: "required" })}
              id="pincode"
              name="pincode"
              autoComplete="postal-code"
              className="block w-full rounded-md border-0 py-1.5 px-4  text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield] focus-visible:outline-none"
            />
          </div>
          {errors.pincode && <p className="text-red-500">* required</p>}
        </div>

        <div className="col-span-full md:col-span-3 lg:col-span-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Phone
          </label>
          <div className="mt-2">
            <input
              type="number"
              {...register("phone", { required: "required" })}
              id="phone"
              autoComplete="phone"
              className="block w-full rounded-md border-0 py-1.5 px-4  text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield] focus-visible:outline-none"
            />
          </div>
          {errors.phone && <p className="text-red-500">* required</p>}
        </div>
      </div>

      <div className="my-6 ml-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => setaddFormVisibility(!addFormVisibility)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold dark:text-gray-100 dark:bg-gray-800  hover:bg-gray-50 dark:hover:bg-gray-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-gray-600 bg-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white  bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-customBlue"
        >
          Add
        </button>
      </div>
    </form>
  );
}
