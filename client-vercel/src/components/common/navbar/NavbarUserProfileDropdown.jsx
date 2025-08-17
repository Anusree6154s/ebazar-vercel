import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function NavbarUserProfileDropdown({ user, userNavigation }) {
  if (!user) return null;

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 dark:bg-gray-700">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user.image || "images/profile-icon.png"}
            alt=""
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
        {userNavigation ? (
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg  dark:bg-gray-700  ">
            {userNavigation.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <Link
                    to={item.link}
                    className={classNames(
                      active ? "bg-gray-100" : "dark:bg-gray-700",
                      "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300",
                      "hover:bg-gray-100 dark:hover:bg-gray-600", // Adding hover colors
                      "transition-colors ease-in-out duration-150" // Adding transition effect
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        ) : (
          <div>Login to view profile</div>
        )}
      </Transition>
    </Menu>
  );
}
