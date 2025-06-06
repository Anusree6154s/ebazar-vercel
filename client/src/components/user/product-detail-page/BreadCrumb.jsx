import React from "react";
import { Link } from "react-router-dom";

export default function BreadCrumb({productTitle, link}) {
  return (
    <div className="flex gap-1 items-center text-gray-400">
      <Link
        to={link}
        aria-current="page"
        className=" text-sm font-medium text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-100 cursor-pointer transition duration-300"
      >
        Products
      </Link>
      <span>&gt;</span>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-200 cursor-auto">
        {productTitle}
      </span>
    </div>
  );
}
