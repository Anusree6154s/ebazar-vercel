import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sort({ setSort }) {
  const [sortOptions, setSortOptions] = useState([
    { name: "Best Rating", sorts: "rating", order: "desc", current: false },
    {
      name: "Price: Low to High",
      sorts: "price",
      order: "asc",
      current: false,
    },
    {
      name: "Price: High to Low",
      sorts: "price",
      order: "desc",
      current: false,
    },
    { name: "Clear Sort", current: false },
  ]);

  const handleSort = (option) => {
    const newSort =
      option.name === "Clear Sort"
        ? {}
        : { _sort: option.sorts, _order: option.order };
    setSort(newSort);

    const newSortOptions = sortOptions.map((item) => {
      if (item.name === option.name && item.name !== "Clear Sort")
        return { ...item, current: true };
      return { ...item, current: false };
    });
    setSortOptions(newSortOptions);
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 ">
          Sort
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-700 shadow-2xl ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => (
              <Menu.Item key={option.name} label={option.label}>
                {({ active }) => (
                  <button
                    className={classNames(
                      option.current
                        ? "font-medium text-gray-900 dark:text-gray-100"
                        : "text-gray-500 dark:text-gray-300",
                      active && "bg-gray-100 dark:bg-gray-600 w-full",
                      "block px-4 py-2 text-sm  w-full text-left",
                    )}
                    onClick={() => handleSort(option)}
                  >
                    {option.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
