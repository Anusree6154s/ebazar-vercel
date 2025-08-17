export function EditUserProfile({
  handleSubmit3,
  handleEditProfile,
  setEditProfileVisibility,
  editProfileVisibility,
  register3,
  user,
}) {
  return (
    <form
      noValidate
      onSubmit={handleSubmit3((data) => {
        handleEditProfile(data);
        setEditProfileVisibility(!editProfileVisibility);
      })}
      className={editProfileVisibility ? "" : "hidden mt-6"}
    >
      <div className="border-b border-gray-300 dark:border-gray-700 pb-12  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Full name
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register3("name")}
              id="name"
              autoComplete="name"
              defaultValue={user?.name || ""}
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-gray-300  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 focus-visible:outline-none"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="image"
            className=" block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Profile Image
          </label>
          <div className="mt-2 grid grid-cols-13 items-center">
            <input
              type="text"
              {...register3("image")}
              id="image"
              autoComplete="image"
              defaultValue={user?.image || ""}
              placeholder="Place image url here"
              className="inline col-span-full sm:col-span-6 rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-gray-300  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 focus-visible:outline-none"
            />
            <span className="md:ml-2 block md:inline mt-2 md:mt-0 font-medium text-sm dark:text-gray-300 col-span-full sm:col-span-1 text-center text-gray-500">
              OR
            </span>
            <input
              type="file"
              {...register3("image2")}
              id="image2"
              autoComplete="image2"
              defaultValue={user?.image2 || ""}
              className="md:ml-2 mt-2 md:mt-0 inline col-span-full sm:col-span-6 cursor-pointer hover:bg-gray-200/80 rounded-md bg-gray-200 border-gray-100 dark:border-gray-800 border-1 py-1.5 px-4 text-gray-600 dark:text-gray-300  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 focus-visible:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="m-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => setEditProfileVisibility(!editProfileVisibility)}
          className="rounded-md border px-3 py-2 text-sm font-semibold dark:text-gray-100 dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-customBlue"
        >
          Add
        </button>
      </div>
    </form>
  );
}
