import { Disclosure } from "@headlessui/react";
import {
    MinusIcon,
    PlusIcon
} from "@heroicons/react/solid";
import React from "react";

export function DesktopFilter({ filters, handleFilter, filter }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 dark:border-gray-500 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white dark:bg-gray-800 py-3 text-sm text-gray-400 hover:text-gray-500 datk:text-gray-300 dark:hover:text-gray-100">
                  <span className="font-medium text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIndex) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIndex}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={
                          filter[section.id]
                            ? filter[section.id].includes(option.value)
                            : false
                        }
                        onChange={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-customBlue focus:ring-transparent"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIndex}`}
                        className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}