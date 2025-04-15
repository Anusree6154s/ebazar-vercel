import { useForm, useFormContext } from "react-hook-form";
import InputElement from "./InputElement";

const RenderFormFieldElements = (
  {
    formFor,
    registerOptions,
    fieldOptions,
    fieldType,
    // register,
    selectOptions,
  },
  ref
) => {
  const { register } = useFormContext();
  const baseProps = {
    ...fieldOptions,
    // {...register(formFor, registerOptions)},
    id: formFor,
    autoComplete: formFor,
  };

  switch (fieldType) {
    case "input":
      return (
        <InputElement
          baseProps={baseProps}
          // register={register}
          formFor={formFor}
          registerOptions={registerOptions}
        />
      );
    case "textarea":
      return (
        <textarea {...baseProps} {...register(formFor, registerOptions)} />
      );
    case "select":
      return (
        <select {...baseProps} {...register(formFor, registerOptions)}>
          {selectOptions?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {/* <option value="">--- choose brand ---</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand.label}>
              {brand.label}
            </option>
          ))} */}
        </select>
      );
    default:
      return null;
  }
};

export default RenderFormFieldElements;
