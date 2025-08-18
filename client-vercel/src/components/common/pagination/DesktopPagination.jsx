import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export function DesktopPagination({
  startItems,
  endItems,
  totalItems,
  handlePrev,
  page,
  dispatch,
  pageBoundary,
  handleNext,
  totalPages,
  setPage
}) {
  return (
    <div className="hidden sm:flex sm:flex-col-reverse lg:flex-row sm:gap-4 sm:flex-1 sm:items-center sm:justify-between">
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
                : "text-gray-700 dark:text-gray-400 cursor-pointer border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
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
              onClick={() => dispatch(setPage(index + 1 + pageBoundary.index))}
              aria-current="page"
              className={`w-10 justify-center relative z-10 inline-flex items-center dark:border-gray-500 ${
                index + 1 + pageBoundary.index === page
                  ? "bg-customBlue dark:bg-blue-500 text-white"
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-gray-100 "
              } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-customBlue cursor-pointer ring-gray-300 dark:ring-gray-700  border border-gray-300 `}
            >
              {index + 1 + pageBoundary.index}
            </div>
          ))}

          <div
            onClick={handleNext}
            className={`relative inline-flex items-center rounded-r-md border px-2 py-2 text-sm font-medium ${
              page + 1 > totalPages
                ? "bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 "
                : "text-gray-700 dark:text-gray-400 cursor-pointer border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
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
  );
}