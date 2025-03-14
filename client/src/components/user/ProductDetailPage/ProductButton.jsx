import React from "react";

export default function ProductButton({ handleClick, className , text}) {
  return (
    <button
      onClick={handleClick}
      type="submit"
      className={`flex w-full items-center justify-center rounded-md border px-8 py-3 text-base font-medium focus:outline-none focus:ring-2 ${className}`}
    >
      {text}
    </button>
  );
}
