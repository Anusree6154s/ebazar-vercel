import React, { useEffect, useRef, useState } from "react";

export default function CustomSelect({ options, onClickFn, startingValue }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(startingValue);

  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // Close dropdown when clicking <o></o>utside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Button */}
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="flex w-12 items-center justify-between rounded-md border-gray-100  bg-gray-100 px-2 py-1 text-left text-sm text-gray-700 focus:border-0 focus:outline-gray-100 focus:ring-1 focus:ring-gray-100"
      >
        <span>{selected}</span>
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul
          ref={menuRef}
          className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg"
        >
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSelected(option);
                setOpen(false);
                onClickFn(option);
              }}
              className="cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
