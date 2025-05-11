import React, { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

const InputElement = forwardRef(
  ({ baseProps, formFor, registerOptions }, ref) => {
    const { register } = useFormContext();
    return (
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  dark:ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-customBlue dark:focus-within:ring-blue-500  sm:max-w-md">
        <input
          {...baseProps}
          {...register(formFor, registerOptions)}
          // ref={ref}
        />
      </div>
    );
  }
);

export default InputElement;
