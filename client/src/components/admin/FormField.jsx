import RenderFormFieldElements from "./RenderFormFieldElements";

export default function FormField({
  formClass,
  formFor,
  labelName,
  registerOptions,
  fieldType,
  fieldOptions,
  // register,
  selectOptions,
}) {
  return (
    <div className={formClass}>
      <label
        htmlFor={formFor}
        className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-300"
      >
        {labelName}
      </label>
      <div className="mt-2">
        <RenderFormFieldElements
          formFor={formFor}
          // register={register}
          registerOptions={registerOptions}
          fieldOptions={fieldOptions}
          fieldType={fieldType}
          selectOptions={selectOptions}
        />
      </div>
    </div>
  );
}
