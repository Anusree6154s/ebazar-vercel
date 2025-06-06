import { useFormContext } from "react-hook-form";
import InputElement from "./InputElement";

const RenderFormFieldElements = ({
  formFor,
  registerOptions,
  fieldOptions,
  fieldType,
  selectOptions,
}) => {
  const { register } = useFormContext();
  const baseProps = {
    ...fieldOptions,
    id: formFor,
    autoComplete: formFor,
  };

  switch (fieldType) {
    case "input":
      return (
        <InputElement
          baseProps={baseProps}
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
        </select>
      );
    default:
      return null;
  }
};

export default RenderFormFieldElements;
