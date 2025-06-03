import { FormProvider, useForm } from "react-hook-form";
import { addFormSections, FormFieldElementOptions } from "../../config";
import { useAddProductForm } from "../../hooks";
import FormField from "./FormField";

export default function AddProductForm() {
  const methods = useForm();
  const { handleSubmit: remmy, reset } = methods;
  const { submitHandler } = useAddProductForm();

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={remmy(submitHandler)}>
        <div className="border-b border-gray-900/10 dark:border-gray-700 pb-12">
          {addFormSections.map((section) => (
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
            onClick={() => reset()}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
          >
            Reset
          </button>

          <button
            type="submit"
            className="rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-90 hover:bg-opacity-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-customBlue dark:focus-visible:outline-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
