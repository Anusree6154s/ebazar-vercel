import { Disclosure } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";

export function MobileNavbarProfileDropdown({ user, userNavigation }) {
  const navigate = useNavigate();

  return (
    <Disclosure.Panel className="md:hidden">
      <div className="border-t border-gray-700 pb-3 pt-4 px-6 sm:px-10">
        {user && (
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={user.image || "/images/profile-icon.png"}
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                {user.name}
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                {user.email}
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 space-y-1 px-2">
          {userNavigation &&
            userNavigation.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              >
                <Disclosure.Button key={item.name}>
                  {item.name}
                </Disclosure.Button>
              </Link>
            ))}
        </div>

        {!user && (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/login")}
              className="p-2 text-center rounded-sm bg-orange-500 text-white font-medium w-full"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="p-2  text-center rounded-sm  text-orange-400  border border-orange-400 font-medium w-full"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </Disclosure.Panel>
  );
}
