import React from "react";
import { useFormContext } from "react-hook-form";
import { useAddProfileForm } from "../../hooks";

export default function AdminProfileForm({
  user,
  setaddFormVisibility,
  addFormVisibility,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext();
  const { submitHandle } = useAddProfileForm(
    user,
    setaddFormVisibility,
    addFormVisibility
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submitHandle)}
      className={addFormVisibility ? "" : "hidden mt-6"}
    >
      <div className="pt-6 border-b border-gray-300 dark:border-gray-700 pb-12  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Full name
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register("name")}
              id="name"
              autoComplete="name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-full ">
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Profile Image
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register("image")}
              id="image"
              autoComplete="image"
              placeholder="Place image url here"
              className=" w-1/2 rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 "
            />
            <span className="mx-2 text-sm leading-6 font-medium text-gray-900 dark:text-gray-300">
              OR
            </span>
            <input
              type="file"
              {...register("image2")}
              id="image2"
              autoComplete="image2"
              className="w-50 rounded-md  py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
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
              {...register("country")}
              autoComplete="country"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:bg-gray-800 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>India</option>
              <option>China</option>
              <option>Mexico</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="place"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Place
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register("place")}
              id="place"
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="street"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Street address
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register("street")}
              id="street"
              autoComplete="street"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
            />
          </div>
          {errors.street && <p className="text-red-500">* required</p>}
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
              {...register("city")}
              id="city"
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-cutomBlue sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="state"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            State
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register("state")}
              id="state"
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-cutomBlue sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="pincode"
            className="block text-sm font-medium leading-6  dark:text-gray-300"
          >
            Pin code
          </label>
          <div className="mt-2">
            <input
              type="number"
              {...register("pincode")}
              id="pincode"
              name="pincode"
              autoComplete="postal-code"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-cutomBlue sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Phone
          </label>
          <div className="mt-2">
            <input
              type="number"
              {...register("phone")}
              id="phone"
              autoComplete="phone"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-cutomBlue sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="m-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => setaddFormVisibility(!addFormVisibility)}
          className="rounded-md border px-3 py-2 text-sm font-semibold dark:text-gray-100 dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-customBlue"
        >
          Save
        </button>
      </div>
    </form>
  );
}
