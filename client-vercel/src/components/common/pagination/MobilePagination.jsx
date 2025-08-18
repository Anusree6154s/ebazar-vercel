export function MobilePagination({ dispatch, page, totalPages, setPage }) {
  return (
    <div className="flex flex-1 justify-between sm:hidden">
      <button
        onClick={() => dispatch(setPage(page > 1 ? page - 1 : page))}
        className={`relative inline-flex items-center rounded-md border border-gray-300   px-4 py-2 text-sm font-medium ${
          page - 1 < 1
            ? "bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 "
            : "text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
        }`}
      >
        Previous
      </button>
      <p className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Page {page}
      </p>
      <button
        onClick={() => dispatch(setPage(page < totalPages ? page + 1 : page))}
        className={`relative inline-flex items-center rounded-md border border-gray-300   px-4 py-2 text-sm font-medium ${
          page + 1 > totalPages
            ? "bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 "
            : "text-gray-700 dark:text-gray-400  hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
        }`}
      >
        Next
      </button>
    </div>
  );
}
