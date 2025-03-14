import { ArrowLeftIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";

export default function BackButton() {
  return (
    <Link
      to="/"
      className="p-2 mb-5 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 flex w-fit items-center gap-2"
    >
      <ArrowLeftIcon className="h-4 w-4 inline " />
      <span>Back</span>
    </Link>
  );
}
