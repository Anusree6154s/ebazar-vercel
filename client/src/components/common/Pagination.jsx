import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage } from "../../redux";

export default function Pagination({ totalItems }) {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const [pageBoundary, setPageBoundary] = useState({
    start: 1,
    end: 10,
    index: 0,
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startItems = (page - 1) * ITEMS_PER_PAGE + 1;
  const endItems =
    page * ITEMS_PER_PAGE > totalItems ? totalItems : page * ITEMS_PER_PAGE;

  const handlePrev = () => {
    dispatch(setPage(page > 1 ? page - 1 : page));
    if (page === pageBoundary.start && page !== 1)
      setPageBoundary({
        start: pageBoundary.start - 1,
        end: pageBoundary.end - 1,
        index: pageBoundary.index - 1,
      });
  };

  const handleNext = () => {
    dispatch(setPage(page < totalPages ? page + 1 : page));
    if (page === pageBoundary.end && page !== totalPages)
      setPageBoundary({
        start: pageBoundary.start + 1,
        end: pageBoundary.end + 1,
        index: pageBoundary.index + 1,
      });
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:border-transparent dark:bg-gray-800  pt-6 ">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={(e) => dispatch(setPage(page > 1 ? page - 1 : page))}
          className={`relative inline-flex items-center rounded-md border border-gray-300   px-4 py-2 text-sm font-medium ${
            page - 1 < 1
              ? "bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 "
              : "text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
          }`}
        >
          Previous
        </button>
        <p className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Page {page}
        </p>
        <button
          onClick={(e) =>
            dispatch(setPage(page < totalPages ? page + 1 : page))
          }
          className={`relative inline-flex items-center rounded-md border border-gray-300   px-4 py-2 text-sm font-medium ${
            page + 1 > totalPages
              ? "bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 "
              : "text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{startItems}</span> to{" "}
            <span className="font-medium">{endItems}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={handlePrev}
              className={`relative inline-flex items-center rounded-l-md border px-2 py-2 text-sm font-medium ${
                page - 1 < 1
                  ? "bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 "
                  : "text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </div>

            {Array.from({ length: 10 }).map((items, index) => (
              <div
                key={index}
                onClick={() =>
                  dispatch(setPage(index + 1 + pageBoundary.index))
                }
                aria-current="page"
                className={`w-10 justify-center relative z-10 inline-flex items-center dark:border-gray-500 ${
                  index + 1 + pageBoundary.index === page
                    ? "bg-customBlue dark:bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-gray-100 "
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue cursor-pointer ring-gray-300 dark:ring-gray-700  border border-gray-300 `}
              >
                {index + 1 + pageBoundary.index}
              </div>
            ))}

            <div
              onClick={handleNext}
              className={`relative inline-flex items-center rounded-r-md border px-2 py-2 text-sm font-medium ${
                page + 1 > totalPages
                  ? "bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 "
                  : "text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
