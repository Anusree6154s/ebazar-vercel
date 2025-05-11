import React from "react";

export default function AdminProfileCard({ addFormVisibility, user }) {
  return (
    <div
      className={`flex flex-col items-center gap-10  ${
        !addFormVisibility ? "" : "hidden mt-6"
      }`}
    >
      <img
        src={
          user.image ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZbXR5XmpH1OOJhigJF4nWkJIITHis1Y4dA&s"
        }
        alt={user.name}
        className="w-40 h-40 rounded-full"
      />

      <div className="inline-flex text-gray-900 dark:text-gray-300 text-xl font-medium flex-col gap-5 ">
        {user.name && (
          <p>
            <span>Name:</span>
            <span className="ml-12 font-normal dark:text-gray-400">
              {user.name}
            </span>
          </p>
        )}
        <p>
          <span>Email:</span>
          <span className="ml-12 font-normal dark:text-gray-400">
            {user.email}
          </span>
        </p>
        <p>
          <span>Role:</span>
          <span className="ml-14 font-normal dark:text-gray-400">
            {user.role}
          </span>
        </p>
        {user.address && (
          <div className="flex ">
            <p>Address: </p>
            <div className="ml-7 font-normal dark:text-gray-400 flex flex-col">
              <span>
                {user.address.place}, {user.address.street}
              </span>
              <span>
                {user.address.city}, {user.address.state}
              </span>
              <span>
                {user.address.country}, {user.address.pincode}
              </span>
            </div>
          </div>
        )}
        {user.phone && (
          <p>
            Phone:{" "}
            <span className="ml-8 font-normal dark:text-gray-400">
              {user.phone}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
