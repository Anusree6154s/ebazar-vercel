import { useFormContext } from "react-hook-form";
import { editFormSections, FormFieldElementOptions } from "../../config";
import { useEditProductForm } from "../../hooks";
import FormField from "./FormField";

export default function EditProductForm() {
  const { handleSubmit } = useFormContext();
  const { submitHandler, handleDelete } = useEditProductForm();

  return (
    <form noValidate onSubmit={handleSubmit(submitHandler)}>
      <div className="border-b border-gray-900/10 dark:border-gray-700 pb-12">
        {editFormSections.map((section) => (
          <>
            <p className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-300">
              {section.name}
            </p>
            <div className={section.formFieldClass}>
              {FormFieldElementOptions()[section.formFieldName].map(
                (elementOptions, i) => (
                  <FormField key={i} {...elementOptions} />
                )
              )}
            </div>
          </>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={handleDelete}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
