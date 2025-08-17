import { EditAddressForm } from "./EditAddressForm";

export function UserProfileAddressCard({
  index,
  address,
  handleDelete,
  handleOpenForm,
  handleSubmit2,
  handleEdit,
  setVisibilityIndex,
  visibilityIndex,
  register2,
  errors2,
}) {
  return (
    <li
      key={index}
      className="items-baseline bg-gray-50 rounded-md dark:border-transparent p-5 dark:bg-gray-800"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 items-baseline p-5 gap-4 sm:gap-0">
        <div className="flex-col justify-between  items-baseline gap-x-6 sm:py-5">
          <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
            {address.name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-300">
            {address.street}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-300">
            {address.city}
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:items-center">
          <p className="text-sm leading-6 text-gray-900 dark:text-gray-100">
            {address.phone}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-300">
            {address.pincode}
          </p>
        </div>

        <div className="flex shrink-0 sm:flex sm:flex-col sm:items-end gap-2">
          <button
            onClick={() => handleDelete(index)}
            type="button"
            className="font-medium text-sm text-red-500 bg-red-100/70 py-2 px-4 hover:bg-red-100 dark:text-red-500 dark:hover:text-red-500"
          >
            Remove
          </button>
          <button
            onClick={() => handleOpenForm(index)}
            type="button"
            className="font-medium text-sm text-customBlue bg-customBlue/10 hover:bg-customBlue/15 py-2 px-7 dark:text-blue-400 dark:hover:text-blue-500"
          >
            Edit
          </button>
        </div>
      </div>

      <EditAddressForm
        handleSubmit2={handleSubmit2}
        handleEdit={handleEdit}
        index={index}
        setVisibilityIndex={setVisibilityIndex}
        visibilityIndex={visibilityIndex}
        register2={register2}
        errors2={errors2}
      />
    </li>
  );
}
